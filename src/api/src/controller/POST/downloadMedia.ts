import downloadVodPlaylist from "../../models/DownloadVodPlaylist";
import downloadVodFragments from "../../models/DownloadVodFragments";
import createMergeFile from "../../models/CreateMergeFile";
import handleMerging from "../../models/HandleMerging";
import { readFile } from "jsonfile";

import { Request, Response } from "express";

import mainWindow from "../../../../index";

export default async function streamDownload(req: Request, res: Response) {
  console.time("Operations Completed in ");

  const { outputPath } = await readFile("./src/api/config.json");

  try {
    mainWindow.webContents.send("download-fully-starts");

    mainWindow.webContents.send("recovering-frags-playlists-starts");
    
    const videoUrlList = await downloadVodPlaylist(req.body.videoUrl);
    const audioUrlList = await downloadVodPlaylist(req.body.audioUrl);

    mainWindow.webContents.send("recovering-frags-playlists-ends");

    mainWindow.webContents.send("downloading-frags-starts");

    await downloadVodFragments(videoUrlList, "ts", outputPath);
    await downloadVodFragments(audioUrlList, "aac", outputPath);

    mainWindow.webContents.send("downloading-frags-ends");

    mainWindow.webContents.send("merging-starts");

    await createMergeFile("listVideo", videoUrlList, outputPath, "ts");
    await createMergeFile("listAudio", audioUrlList, outputPath, "aac");

    await handleMerging(req.body.vodTitle, outputPath);

    mainWindow.webContents.send("merging-ends");

    mainWindow.webContents.send("download-fully-completed");

    console.timeEnd("Operations Completed in ");

    res.status(200);
    res.json({ "Download": true });
  } catch (error) {
    res.status(404);
    res.json({ errorMessage: error });
  }
}
