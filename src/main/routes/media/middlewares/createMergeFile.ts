import { Response, NextFunction } from "express";
import { truncate, promises } from "fs";

import { PROCESSING_FOLDER } from "../../../../config";

type MediaExtension = "ts" | "aac" | "mp4" | "mp4a";

export async function createVideoMergeFile(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { videoUrlList, saveLocation, ext } = req;
  await createMergeFile("listVideo", videoUrlList, saveLocation, ext.video);
  next();
}

export async function createAudioMergeFile(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { audioUrlList, saveLocation, ext } = req;

  await createMergeFile("listAudio", audioUrlList, saveLocation, ext.audio);
  next();
}

async function createMergeFile(
  fileName: string,
  urlList: Array<string>,
  saveLocation: string,
  extension: MediaExtension
) {
  const mergeFilePath = `${PROCESSING_FOLDER}/${fileName}.txt`;
  const options = { flag: "a" };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  truncate(mergeFilePath, 0, () => {});

  for (let i = 0; i < urlList.length; i++) {
    const data = `file '${saveLocation}/${i}.${extension}'\n`;

    await promises.writeFile(mergeFilePath, data, options);
  }
}
