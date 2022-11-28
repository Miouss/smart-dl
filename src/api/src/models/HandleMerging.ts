import merging from "../utilFcts/Merging";
import Listr from "listr";

import {getWindow} from "../../../index";

export default async function handleMerging(
  vodTitle: string,
  outputPath: string
) {
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
    `"${outputPath}\\${vodTitle
      // eslint-disable-next-line no-useless-escape
      .replace(/[\/]/g, "-")
      // eslint-disable-next-line no-useless-escape
      .replace(/[\/\\:*?"<>]/g, "")}".mp4`,
  ];

  const mergingTasks = new Listr([
    {
      title: "Merging Video Fragments",
      task: async () => {
        getWindow().webContents.send("merging-video-starts");
        await merging("ffmpeg", mergingVideoFrags);
        getWindow().webContents.send("merging-video-ends");
      },
    },
    {
      title: "Merging Audio Fragments",
      task: async () => {
        getWindow().webContents.send("merging-audio-starts");
        await merging("ffmpeg", mergingAudioFrags);
        getWindow().webContents.send("merging-audio-ends");
      },
    },
    {
      title: "Deleting Video & Audio Fragments",
      task: async () => {
        getWindow().webContents.send("deleting-frags-starts");
        await merging("del-frag-src.bat", [`${outputPath}`]);
        getWindow().webContents.send("deleting-frags-ends");
      },
    },
    {
      title: "Merging Video with Audio",
      task: async () => {
        getWindow().webContents.send("merging-parts-starts");
        await merging("ffmpeg", mergingVideoWithAudio);
        getWindow().webContents.send("merging-parts-ends");
      },
    },
    {
      title: "Deleting Video and Audio Parts",
      task: async () => {
        getWindow().webContents.send("deleting-parts-starts");
        await merging("del-full-src.bat", [`${outputPath}`]);
        getWindow().webContents.send("deleting-parts-ends");
      },
    },
  ]);

  await mergingTasks.run();
}
