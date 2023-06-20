import { ipcMain } from "electron";
import child_process from "child_process";
import killer from "tree-kill";

import fireEvent from "../../../../../../../electron";

import { PROCESSING_FOLDER } from "../../../../../../config";

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
    `"${saveLocation}/output.ts"`,
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
    `"${saveLocation}/output.aac"`,
  ];

  fireEvent("merging-audio-starts");
  await merging(instruction);
  fireEvent("merging-audio-ends");
}

export async function mergeParts(saveLocation: string, vodTitle: string) {
  const sanitizedVodTitle = vodTitle
    .replace(/([^ ]):/g, "$1 -")
    .replace(/:/g, "-")
    .replace(/[<>"/\\|?*]/g, "");

  const instruction = [
    "-y",
    "-i",
    `${saveLocation}/output.ts`,
    "-i",
    `${saveLocation}/output.aac`,
    "-c",
    "copy",
    `"${saveLocation}/${sanitizedVodTitle}.mp4"`,
  ];

  fireEvent("merging-parts-starts");
  await merging(instruction);
  fireEvent("merging-parts-ends");
}

async function merging(unsanitizedCommand: string[]) {
  const prefix = process.platform === "win32" ? "" : "./";

  const sanitizedCommand = unsanitizedCommand.reduce(
    (prev, current) => prev + " " + current
  );

  const command = `${prefix}ffmpeg ` + sanitizedCommand;

  const options = {
    cwd: PROCESSING_FOLDER,
  };

  const mergingProcess = child_process.exec(command, options);

  await new Promise<void>((resolve, reject) => {
    mergingProcess;
    console.log(mergingProcess.spawnargs);
    ipcMain.once("cancel-button-clicked", () => {
      killer(mergingProcess.pid, "SIGKILL");
    });

    mergingProcess.on("exit", (code) => {
      if (code === null || code === 1 || mergingProcess.killed) {
        console.log("Merge process killed");
        reject(Error("cancel"));
      }
      console.log(`Merge process exited with code ${code}`);
      if (code === 0) resolve();
    });
  });
}
