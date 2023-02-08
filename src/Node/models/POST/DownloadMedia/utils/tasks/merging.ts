import { ipcMain } from "electron";
import child_process from "child_process";

import fireEvent from "../../../../../../Electron/index";

import { PROCESSING_FOLDER } from "../../../../../../constants/constants";

export async function mergeVideo(saveLocation: string) {
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
    `${saveLocation}\\output.ts`,
  ];

  fireEvent("merging-video-starts");
  await merging(instruction);
  fireEvent("merging-video-ends");
}

export async function mergeAudio(saveLocation: string) {
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
    `${saveLocation}\\output.aac`,
  ];

  fireEvent("merging-audio-starts");
  await merging(instruction);
  fireEvent("merging-audio-ends");
}

export async function mergeParts(saveLocation: string, vodTitle: string) {
  const instruction = [
    "-y",
    "-i",
    `${saveLocation}\\output.ts`,
    "-i",
    `${saveLocation}\\output.aac`,
    "-c",
    "copy",
    `${saveLocation}\\${vodTitle}.mp4`,
  ];

  fireEvent("merging-parts-starts");
  await merging(instruction);
  fireEvent("merging-parts-ends");
}

async function merging(options: string[]) {
  const mergingProcess = child_process.execFile("ffmpeg", options, {
    cwd: `${PROCESSING_FOLDER}`,
  });
  try {
    await new Promise<void>((resolve, reject) => {
      mergingProcess;

      ipcMain.once("cancel-button-clicked", () => {
        mergingProcess.kill();
      });

      mergingProcess.on("exit", (code) => {
        if (mergingProcess.killed) {
          console.log("Merging process killed");
          reject(Error("cancel"));
        }
        if (code === 0) {
          resolve();
        } else {
          reject(Error(`Merge process exited with code ${code}`));
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}
