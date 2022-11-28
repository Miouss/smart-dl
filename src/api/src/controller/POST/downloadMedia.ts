import downloadVodPlaylist from "../../models/DownloadVodPlaylist";
import downloadVodFragments from "../../models/DownloadVodFragments";
import createMergeFile from "../../models/CreateMergeFile";
import handleMerging from "../../models/HandleMerging";
import { readFile } from "jsonfile";

import { Request, Response } from "express";

import {getWindow} from "../../../../index";

export default async function streamDownload(req: Request, res: Response) {
  console.time("Operations Completed in ");

  const { outputPath } = await readFile("./src/api/config.json");

  try {
    getWindow().webContents.send("download-fully-starts");

    getWindow().webContents.send("recovering-frags-playlists-starts");
    
    const videoUrlList = await downloadVodPlaylist(req.body.videoUrl);
    const audioUrlList = await downloadVodPlaylist(req.body.audioUrl);

    getWindow().webContents.send("recovering-frags-playlists-ends");

    getWindow().webContents.send("downloading-frags-starts");

    await downloadVodFragments(videoUrlList, "ts", outputPath);
    await downloadVodFragments(audioUrlList, "aac", outputPath);

    getWindow().webContents.send("downloading-frags-ends");

    getWindow().webContents.send("merging-starts");

    await createMergeFile("listVideo", videoUrlList, outputPath, "ts");
    await createMergeFile("listAudio", audioUrlList, outputPath, "aac");

    await handleMerging(req.body.vodTitle, outputPath);

    getWindow().webContents.send("merging-ends");

    getWindow().webContents.send("download-fully-completed");

    console.timeEnd("Operations Completed in ");

    res.status(200);
    res.json({ "Download": true });
  } catch (error) {
    res.status(404);
    res.json({ errorMessage: error });
  }
}
