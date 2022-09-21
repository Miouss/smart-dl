import downloadVodPlaylist from "../../models/DownloadVodPlaylist";
import downloadVodFragments from "../../models/DownloadVodFragments";
import createMergeFile from "../../models/CreateMergeFile";
import handleMerging from "../../models/HandleMerging";
import { readFile } from "jsonfile";

import { Request, Response } from "express";

export default async function mockRequest(req: Request, res: Response) {
  console.time("Operations Completed in ");

  const { outputPath } = await readFile("./src/api/config.json");

  try {
    const vodChoices = req.body.mediaSelection;

    const vodVideoUrlPlaylist: string =
      vodChoices.prefix +
      vodChoices.VideoSelection[vodChoices.VideoSelection.length - 1].url;
    const vodAudioUrlPlaylist: string =
      vodChoices.prefix +
      vodChoices.AudioSelection[
        vodChoices.VideoSelection[vodChoices.VideoSelection.length - 1].audio
      ].English.uri;

    const videoUrlList = await downloadVodPlaylist(vodVideoUrlPlaylist);
    const audioUrlList = await downloadVodPlaylist(vodAudioUrlPlaylist);

    await downloadVodFragments(videoUrlList, "ts", outputPath);
    await downloadVodFragments(audioUrlList, "aac", outputPath);

    await createMergeFile("listVideo", videoUrlList, outputPath, "ts");
    await createMergeFile("listAudio", audioUrlList, outputPath, "aac");

    await handleMerging(vodChoices.vodTitle, outputPath);

    console.timeEnd("Operations Completed in ");

    res.status(200);
    res.json(vodChoices);
  } catch (error) {
    res.status(404);
    res.json({ errorMessage: error });
  }
}
