import fetch from "cross-fetch";
import { createWriteStream } from "fs";

import fireEvent from "../../../../../index";
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
  const simultaneousDL = 10;
  const mediaTypeLowerCase = mediaType.toLowerCase();

  fireEvent(`downloading-${mediaTypeLowerCase}-frags-starts`);

  ipcMain.setMaxListeners(simultaneousDL + 1);

  for (let i = 0; i < urlList.length; i += simultaneousDL) {
    const interval =
      i + simultaneousDL < urlList.length ? simultaneousDL : urlList.length - i;

    const taskTitle = `Downloading ${urlList.length} ${mediaType} Fragments ${
      i + 1
    }-${i + interval}/${urlList.length}`;

    const nbFileDownloading = Array(interval).fill(0);

    fireEvent(`update-${mediaTypeLowerCase}-frags-steps`, taskTitle);

    await Promise.all(
      nbFileDownloading.map(async (_, j) => {
        await downloadingProcess(urlList, outputPath, extension, i + j);
      })
    );

    console.log(`Fragment ${i + 1} to ${i + interval} downloaded`);
  }

  fireEvent(`downloading-${mediaTypeLowerCase}-frags-ends`);
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
    };

    const writeStream = createWriteStream(
      `${outputPath}\\${currentInterval}.${extension}`
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.body.pipe(writeStream);

    ipcMain.on("cancel-button-clicked", cancelDownload);

    writeStream.on("error", (err) => {
      ipcMain.removeListener("cancel-button-clicked", cancelDownload);
      reject(err);
    });

    writeStream.on("finish", () => {
      ipcMain.removeListener("cancel-button-clicked", cancelDownload);
      resolve();
    });
  });
}
