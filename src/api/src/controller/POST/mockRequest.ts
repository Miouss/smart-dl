import Listr from "listr";

import downloadVodPlaylist from "../../models/DownloadVodPlaylist";
import merging from "../../utilFcts/Merging.js";
import { readFile } from "jsonfile";

import { Request, Response } from "express";

export default async function mockRequest(req: Request, res: Response) {
  console.time("Operations Completed in ");

  const { outputPath } = await readFile("./src/api/config.json");

  try {
    const vodChoices = req.body.mediaSelection;

    const vodVideoUrlPlaylist: string =
      vodChoices.prefix + vodChoices.VideoSelection[0].url;
    const vodAudioUrlPlaylist: string =
      vodChoices.prefix +
      vodChoices.AudioSelection[vodChoices.VideoSelection[0].audio].English.uri;

    await downloadVodPlaylist(
      "listVideo",
      vodVideoUrlPlaylist,
      "ts",
      outputPath
    );
    await downloadVodPlaylist(
      "listAudio",
      vodAudioUrlPlaylist,
      "aac",
      outputPath
    );

    const mergingVideoFrags = [
      "-y",
      "-safe",
      "0",
      "-f",
      "concat",
      "-i",
      "listVideo.txt",
      "-c",
      "copy",
      `${outputPath}\\output.ts`,
    ];

    const mergingAudioFrags = [
      "-y",
      "-safe",
      "0",
      "-f",
      "concat",
      "-i",
      "listAudio.txt",
      "-c",
      "copy",
      `${outputPath}\\output.aac`,
    ];

    const mergingVideoWithAudio = [
      "-y",
      "-i",
      `${outputPath}\\output.ts`,
      "-i",
      `${outputPath}\\output.aac`,
      "-c",
      "copy",
      `"${outputPath}\\${vodChoices.vodTitle
        // eslint-disable-next-line no-useless-escape
        .replace(/[\/]/g, "-")
        // eslint-disable-next-line no-useless-escape
        .replace(/[\/\\:*?"<>]/g, "")}".mp4`,
    ];

    const mergingTasks = new Listr([
      {
        title: "Merging Video Fragments",
        task: async () => {
          await merging("ffmpeg", mergingVideoFrags);
        },
      },
      {
        title: "Merging Audio Fragments",
        task: async () => {
          await merging("ffmpeg", mergingAudioFrags);
        },
      },
      {
        title: "Deleting Video & Audio Fragments",
        task: async () => {
          await merging("del-frag-src.bat", [`${outputPath}`]);
        },
      },
      {
        title: "Merging Video with Audio",
        task: async () => {
          await merging("ffmpeg", mergingVideoWithAudio);
        },
      },
      {
        title: "Deleting Video and Audio Parts",
        task: async () => {
          await merging("del-full-src.bat", [`${outputPath}`]);
        },
      },
    ]);

    await mergingTasks.run();

    console.timeEnd("Operations Completed in ");

    res.status(200);
    res.json(vodChoices);
  } catch (error) {
    res.status(404);
    res.json({ errorMessage: error });
  }
}
