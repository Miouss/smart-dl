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

import fireEvent from "../../../../index";

export default async function DownloadMedia(req: Request, res: Response) {
  const { saveLocation } = await readFile("./src/api/config.json");
  const vodTitle = req.body.vodTitle;

  let isCanceled = false;

  ipcMain.once("cancel-button-clicked", () => {
    isCanceled = true;
  });

  const verifyCancelation = () => {
    if (isCanceled) {
      throw Error("cancel");
    }
  };

  try {
    console.time("Operations Completed in ");

    fireEvent("download-fully-starts");

    const videoUrlList = await downloadVodPlaylist(req.body.videoUrl);
    verifyCancelation();
    const audioUrlList = await downloadVodPlaylist(req.body.audioUrl);
    verifyCancelation();

    await promises.writeFile(
      `./src/api/processing/number.txt`,
      `${audioUrlList.length}`,
      { flag: "w" }
    );
    verifyCancelation();

    await downloadVideoFrags(videoUrlList, saveLocation);
    verifyCancelation();

    await downloadAudioFrags(audioUrlList, saveLocation);
    verifyCancelation();

    await createMergeFile("listVideo", videoUrlList, saveLocation, "ts");
    verifyCancelation();

    await createMergeFile("listAudio", audioUrlList, saveLocation, "aac");
    verifyCancelation();

    await mergeDownloadedFiles(vodTitle, saveLocation);
    verifyCancelation();

    fireEvent("download-fully-ends");

    res.status(200);
    res.json({ Download: true });
  } catch (err) {
    console.log(`[ERROR] : \n ${err.message}`);

    if (err.message === "cancel") {
      console.log("Cancel [starts]");
      fireEvent("cancel-starts");
      try {
        await cancelDownloadedFiles(saveLocation, vodTitle);
      } catch (err) {
        console.log(err);
      }
      fireEvent("cancel-ends");
      console.log("Cancel [completed]");

      res.status(200);
      res.json({ Download: false });
    } else {
      res.status(500);
      res.json({ errorMessage: err });
    }
  } finally {
    console.timeEnd("Operations Completed in ");
  }
}
