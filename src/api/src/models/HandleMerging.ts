import merging from "../utilFcts/Merging";
import Listr from "listr";

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
}
