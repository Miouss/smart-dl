import { ipcMain } from "electron";
import execa from "execa";

import getWindow from "../../../../../../../index";

export async function mergeVideoFrags(outputPath: string) {
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

  await merging(instruction, "video");
}

export async function mergeAudioFrags(outputPath: string) {
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

  await merging(instruction, "audio");
}

export async function mergeVideoWithAudio(
  outputPath: string,
  vodTitle: string
) {
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

  await merging(instruction, "parts");
}

async function merging(option: string[], event: string) {
  const mergingProcess = execa("ffmpeg", option, {
    cwd: "./src/api/processing/",
    shell: true,
  });

  const killProcess = () => {
    if (mergingProcess) {
      mergingProcess.cancel();
    }
  };

  ipcMain.once("cancel-button-pressed", killProcess);

  const windowWebContents = getWindow().webContents;

  try {
    windowWebContents.send(`merging-${event}-starts`);

    await mergingProcess;

    windowWebContents.send(`merging-${event}-ends`);
  } catch (err) {
    if (err.isCanceled) {
      return Promise.reject(Error("cancel"));
    }

    return Promise.reject(err);
  } finally {
    ipcMain.removeListener("cancel-button-pressed", killProcess);
  }
}
