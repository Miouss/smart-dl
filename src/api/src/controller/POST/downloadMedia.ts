import { ipcMain } from "electron";

import downloadVodPlaylist from "../../models/DownloadVodPlaylist";
import downloadVodFragments from "../../models/DownloadVodFragments";
import createMergeFile from "../../models/CreateMergeFile";
import handleMerging from "../../models/HandleMerging";
import handleCanceling from "../../models/HandleCanceling";
import { readFile } from "jsonfile";

import { Request, Response } from "express";

import getWindow from "../../../../index";

export default async function downloadMedia(req: Request, res: Response) {
  console.time("Operations Completed in ");

  const { outputPath } = await readFile("./src/api/config.json");
  const vodTitle = req.body.vodTitle;

  const windowWebContents = getWindow().webContents;

  let cancel = false;

  ipcMain.once("cancel-button-pressed", () => {
    cancel = true;
  });

  function checkCancelStatus() {
    if (cancel) {
      throw new Error("cancel");
    }
  }

  try {
    windowWebContents.send("download-fully-starts");

    windowWebContents.send("recovering-frags-playlists-starts");

    const videoUrlList = await downloadVodPlaylist(req.body.videoUrl);
    checkCancelStatus();
    const audioUrlList = await downloadVodPlaylist(req.body.audioUrl);
    checkCancelStatus();

    windowWebContents.send("recovering-frags-playlists-ends");

    windowWebContents.send("downloading-frags-starts");

    let keepDownloading = true;
    let simultaneousDL = 10;
    let index = 0;

    while (keepDownloading) {
      keepDownloading = await downloadVodFragments(
        videoUrlList,
        "ts",
        outputPath,
        index,
        simultaneousDL
      );
      checkCancelStatus();
      index += simultaneousDL;
    }

    windowWebContents.send("download-steps-ends", "Video");

    keepDownloading = true;
    simultaneousDL = 10;
    index = 0;

    while (keepDownloading) {
      keepDownloading = await downloadVodFragments(
        audioUrlList,
        "aac",
        outputPath,
        index,
        simultaneousDL
      );
      checkCancelStatus();
      index += simultaneousDL;
    }
    windowWebContents.send("download-steps-ends", "Audio");

    windowWebContents.send("downloading-frags-ends");

    windowWebContents.send("merging-starts");
    checkCancelStatus();

    await createMergeFile("listVideo", videoUrlList, outputPath, "ts");
    checkCancelStatus();

    await createMergeFile("listAudio", audioUrlList, outputPath, "aac");
    checkCancelStatus();

    await handleMerging(vodTitle, outputPath);
    checkCancelStatus();

    windowWebContents.send("merging-ends");

    windowWebContents.send("download-fully-ends");

    console.timeEnd("Operations Completed in ");

    res.status(200);
    res.json({ Download: true });
  } catch (error) {
    if (error.message === "cancel") {
      console.log("Canceling [started]");
      windowWebContents.send("cancel-starts");
      await handleCanceling(outputPath);
      windowWebContents.send("cancel-ends");
      console.log("Canceling [completed]");

      res.status(200);
      res.json({ Download: false });
    } else {
      res.status(404);
      res.json({ errorMessage: error });
    }
  }
}
