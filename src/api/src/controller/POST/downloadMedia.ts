import downloadVodPlaylist from "../../models/DownloadVodPlaylist";
import downloadVodFragments from "../../models/DownloadVodFragments";
import createMergeFile from "../../models/CreateMergeFile";
import handleMerging from "../../models/HandleMerging";
import { readFile } from "jsonfile";

import { Request, Response } from "express";

export default async function streamDownload(req: Request, res: Response) {
  console.time("Operations Completed in ");

  const { outputPath } = await readFile("./src/api/config.json");

  try {
    const videoUrlList = await downloadVodPlaylist(req.body.videoUrl);
    const audioUrlList = await downloadVodPlaylist(req.body.audioUrl);

    await downloadVodFragments(videoUrlList, "ts", outputPath);
    await downloadVodFragments(audioUrlList, "aac", outputPath);

    await createMergeFile("listVideo", videoUrlList, outputPath, "ts");
    await createMergeFile("listAudio", audioUrlList, outputPath, "aac");

    await handleMerging(req.body.vodTitle, outputPath);

    console.timeEnd("Operations Completed in ");

    res.status(200);
    res.json({ "Download": true });
  } catch (error) {
    res.status(404);
    res.json({ errorMessage: error });
  }
}
