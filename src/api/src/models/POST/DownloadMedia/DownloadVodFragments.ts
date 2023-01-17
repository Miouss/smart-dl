import fetch from "cross-fetch";
import { createWriteStream } from "fs";

import getWindow from "../../../../../index";
import { ipcMain } from "electron";

type MediaExtension = "ts" | "aac";
type MediaType = "Video" | "Audio";

export async function downloadVideoFrags(
  urlList: string[],
  outputPath: string
) {
  await startDownload(urlList, "Video", outputPath, "ts");
}

export async function downloadAudioFrags(
  urlList: string[],
  outputPath: string
) {
  await startDownload(urlList, "Audio", outputPath, "aac");
}

async function startDownload(
  urlList: string[],
  mediaType: MediaType,
  outputPath: string,
  extension: MediaExtension
) {
  const windowWebContents = getWindow().webContents;
  const simultaneousDL = 50;

  ipcMain.setMaxListeners(simultaneousDL + 1);
  
  windowWebContents.send("download-steps-starts", mediaType);

  for (let i = 0; i < urlList.length; i += simultaneousDL) {
    const interval =
      i + simultaneousDL < urlList.length ? simultaneousDL : urlList.length - i;

    const taskTitle = `Downloading ${urlList.length} ${mediaType} Fragments ${
      i + 1
    }-${i + interval}/${urlList.length}`;

    const nbFileDownloading = Array(interval).fill(0);
    
    windowWebContents.send("update-download-steps", taskTitle, mediaType);

    await Promise.all(
      nbFileDownloading.map(async (value, j) => {
        await downloadingProcess(urlList, outputPath, extension, i + j);
      })
    );

    console.log(`Fragment ${i + 1} to ${i + interval} downloaded`);
  }
  windowWebContents.send("download-steps-ends", mediaType);
}

async function downloadingProcess(
  urlList: string[],
  outputPath: string,
  extension: MediaExtension,
  currentInterval: number
) {
  const request = await fetch(urlList[currentInterval]);

  await new Promise<void>((resolve, reject) => {
    const cancelDownload = () => {
      writeStream.destroy(Error("cancel"));
      writeStream.end();
    }

    const writeStream = createWriteStream(
      `${outputPath}\\${currentInterval}.${extension}`
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.body.pipe(writeStream);

    ipcMain.once("cancel-button-pressed", cancelDownload);

    writeStream.on("error", (err) => {
      ipcMain.removeListener("cancel-button-pressed", cancelDownload);
      reject(err);
    });

    writeStream.on("finish", () => {
      ipcMain.removeListener("cancel-button-pressed", cancelDownload);
      resolve();
    });
  });
}
