import { ipcMain } from "electron";
import child_process from "child_process";
import killer from "tree-kill";

import fireEvent from "../../../../../../electron";

import { PROCESSING_FOLDER } from "../../../../../config";
import { MediaExtension } from "../../types";

export async function mergeVideo(saveLocation: string, ext: MediaExtension) {
  await merge(saveLocation, ext, "video");
}

export async function mergeAudio(saveLocation: string, ext: MediaExtension) {
  await merge(saveLocation, ext, "audio");
}

export async function mergeParts(
  saveLocation: string,
  vodTitle: string,
  ext: MediaExtension
) {
  const sanitizedVodTitle = vodTitle
    .replace(/([^ ]):/g, "$1 -")
    .replace(/:/g, "-")
    .replace(/[<>"/\\|?*]/g, "");

  const instruction = [
    "-y",
    "-i",
    `${saveLocation}/output.${ext.video}`,
    "-i",
    `${saveLocation}/output.${ext.audio}`,
    "-c",
    "copy",
    `"${saveLocation}/${sanitizedVodTitle}.mp4"`,
  ];

  fireEvent("merging-parts-starts");
  await merging(instruction);
  fireEvent("merging-parts-ends");
}

async function merge(
  saveLocation: string,
  ext: MediaExtension,
  type: "video" | "audio"
) {
  const typeFirstLetterCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

  const instruction = [
    "-y",
    "-safe",
    "0",
    "-f",
    "concat",
    "-i",
    `list${typeFirstLetterCapitalized}.txt`,
    "-c",
    "copy",
    `"${saveLocation}/output.${ext[type]}"`,
  ];

  const event = `merging-${type}`;
  fireEvent(`${event}-starts`);
  await merging(instruction);
  fireEvent(`${event}-ends`);
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

    mergingProcess.on("exit", (code, signal) => {
      console.log(`Merge process exited with code ${code} and signal ${signal}`);
      if (code === null || code === 1 || mergingProcess.killed) {
        console.log("Merge process killed");
        //reject(Error("cancel"));
      }
      if (code === 0) resolve();
    });
  });
}
