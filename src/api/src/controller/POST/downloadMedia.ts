import { ipcMain } from "electron";
import { promises } from "fs";

import downloadVodPlaylist from "../../models/POST/DownloadMedia/DownloadVodPlaylist";
import {
  downloadVideoFrags,
  downloadAudioFrags,
} from "../../models/POST/DownloadMedia/DownloadVodFragments";
import createMergeFile from "../../models/POST/DownloadMedia/CreateMergeFile";
import mergeDownloadedFiles from "../../models/POST/DownloadMedia/utils/mergeDownloadedFiles";
import cancelDownloadedFiles from "../../models/POST/DownloadMedia/utils/cancelDownloadedFiles";
import { readFile } from "jsonfile";

import { Request, Response } from "express";

import getWindow from "../../../../index";

export default async function DownloadMedia(req: Request, res: Response) {
  const { outputPath } = await readFile("./src/api/config.json");
  const vodTitle = req.body.vodTitle;

  const windowWebContents = getWindow().webContents;

  let isCanceled = false;

  ipcMain.once("cancel-button-pressed", () => {
    isCanceled = true;
  });

  const verifyCancelation = () => {
    if (isCanceled) {
      throw Error("cancel");
    }
  };

  try {
    console.time("Operations Completed in ");

    windowWebContents.send("download-fully-starts");
    windowWebContents.send("recovering-frags-playlists-starts");

    const videoUrlList = await downloadVodPlaylist(req.body.videoUrl);
    verifyCancelation();
    const audioUrlList = await downloadVodPlaylist(req.body.audioUrl);
    verifyCancelation();

    windowWebContents.send("recovering-frags-playlists-ends");

    windowWebContents.send("downloading-frags-starts");

    await downloadVideoFrags(videoUrlList, outputPath);
    verifyCancelation();

    await downloadAudioFrags(audioUrlList, outputPath);
    verifyCancelation();

    windowWebContents.send("downloading-frags-ends");

    windowWebContents.send("merging-starts");

    await createMergeFile("listVideo", videoUrlList, outputPath, "ts");
    verifyCancelation();

    await createMergeFile("listAudio", audioUrlList, outputPath, "aac");
    verifyCancelation();

    await promises.writeFile(
      `./src/api/processing/number.txt`,
      `${audioUrlList.length}`,
      { flag: "w" }
    );
    verifyCancelation();

    await mergeDownloadedFiles(vodTitle, outputPath);
    verifyCancelation();

    windowWebContents.send("merging-ends");

    windowWebContents.send("download-fully-ends");

    res.status(200);
    res.json({ Download: true });
  } catch (err) {
    console.log(`[ERROR] : ${err.message}`);

    if (err.message === "cancel") {
      console.log("Canceling [started]");
      windowWebContents.send("cancel-starts");
      try {
        await cancelDownloadedFiles(outputPath, vodTitle);
      } catch (err) {
        console.log(err);
      }
      windowWebContents.send("cancel-ends");
      console.log("Canceling [completed]");

      res.status(200);
      res.json({ Download: false });
    } else {
      res.status(404);
      res.json({ errorMessage: err });
    }
  } finally {
    ipcMain.removeAllListeners("cancel-button-pressed");
    console.timeEnd("Operations Completed in ");
  }
}
