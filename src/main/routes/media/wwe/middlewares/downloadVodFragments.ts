import fetch from "cross-fetch";
import { createWriteStream } from "fs";

import fireEvent from "../../../../../../electron";
import { ipcMain } from "electron";

type MediaExtension = "ts" | "aac";
type MediaType = "Video" | "Audio";

import { Response, NextFunction } from "express";

export async function downloadVideoFrags(
  req: any,
  _: Response,
  next: NextFunction
) {
  try {
    const { videoUrlList, saveLocation } = req;

    await startDownload(videoUrlList, "Video", saveLocation, "ts");

    next();
  } catch (e) {
    next(new Error("cancel"));
  }
}

export async function downloadAudioFrags(
  req: any,
  _: Response,
  next: NextFunction
) {
  try {
    const { audioUrlList, saveLocation } = req;

    await startDownload(audioUrlList, "Audio", saveLocation, "aac");

    next();
  } catch (e) {
    next(new Error("cancel"));
  }
}

async function startDownload(
  urlList: string[],
  mediaType: MediaType,
  saveLocation: string,
  extension: MediaExtension
) {
  const simultaneousDL = 10;
  mediaType = mediaType.toLowerCase() as MediaType;

  fireEvent(`downloading-${mediaType}-frags-starts`);

  ipcMain.setMaxListeners(simultaneousDL + 1);

  const maxFrags = urlList.length;

  for (let startFrag = 0; startFrag < maxFrags; startFrag += simultaneousDL) {
    const isOverflowingMaxFrags = startFrag + simultaneousDL >= maxFrags;

    const intervalRange = isOverflowingMaxFrags
      ? maxFrags - startFrag
      : simultaneousDL;

    const endInterval = startFrag + intervalRange;

    const intervalRangeLog = `${startFrag + 1}-${endInterval}/${maxFrags}`;

    const taskTitle = `Downloading ${maxFrags} ${mediaType} Fragments ${intervalRangeLog}`;

    fireEvent(`update-${mediaType}-frags-steps`, taskTitle);

    await Promise.all(
      Array(intervalRange)
        .fill(0)
        .map(async (_, j) => {
          await downloadingProcess(
            urlList,
            saveLocation,
            extension,
            startFrag + j
          );
        })
    );

    console.log(`Fragment ${startFrag + 1} to ${endInterval} downloaded`);
  }

  fireEvent(`downloading-${mediaType}-frags-ends`);
}

async function downloadingProcess(
  urlList: string[],
  saveLocation: string,
  extension: MediaExtension,
  currentInterval: number
): Promise<void> {
  let isReqSucceed = false;
  let request: any;

  while (!isReqSucceed) {
    try {
      request = await fetch(urlList[currentInterval]);
      if(!request.ok) throw new Error('Request failed');

      isReqSucceed = true;
    } catch (err) {
      if (err.message === "cancel") throw Error("cancel");
      console.log(`File ${currentInterval} failed to download, retrying...`);
    }
  }

  await new Promise<void>((resolve, reject) => {
    const cancelDownload = () => {
      console.log(`File ${currentInterval} download cancelled`);
      writeStream.destroy();
      reject(Error("cancel"));
    };

    const filePath = `${saveLocation}/${currentInterval}.${extension}`;
    const writeStream = createWriteStream(filePath);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.body.pipe(writeStream);

    ipcMain.once("cancel-button-clicked", cancelDownload);

    writeStream.on("finish", () => {
      ipcMain.removeListener("cancel-button-clicked", cancelDownload);
      resolve();
    });
  });
}
