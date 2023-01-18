import { ipcMain } from "electron";
import execa from "execa";

import fireEvent from "../../../../../../../index";

export async function mergeVideo(outputPath: string) {
  const instruction = [
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

  fireEvent("merging-video-starts");
  await merging(instruction);
  fireEvent("merging-video-ends");
}

export async function mergeAudio(outputPath: string) {
  const instruction = [
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

  fireEvent("merging-audio-starts");
  await merging(instruction);
  fireEvent("merging-audio-ends");
}

export async function mergeParts(outputPath: string, vodTitle: string) {
  const instruction = [
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

  fireEvent("merging-parts-starts");
  await merging(instruction);
  fireEvent("merging-parts-ends");
}

async function merging(option: string[]) {
  const mergingProcess = execa("ffmpeg", option, {
    cwd: "./src/api/processing/",
    shell: true,
  });

  const cancelProcess = () => {
    if (mergingProcess) {
      mergingProcess.kill();
    }
  };

  ipcMain.once("cancel-button-clicked", cancelProcess);

  try {
    await mergingProcess;
  } catch (err) {
    if (err.killed) {
      return Promise.reject(Error("cancel"));
    }

    return Promise.reject(Error(`[MERGING ERROR] : ${err.message}`));
  }
}
