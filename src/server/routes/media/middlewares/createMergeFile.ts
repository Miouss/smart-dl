import { truncate, promises } from "fs";
import { Response, NextFunction } from "express";

import { PROCESSING_FOLDER } from "../../../../config";

type MediaExtension = "ts" | "aac";

export async function createVideoMergeFile(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { videoUrlList, saveLocation } = req;
  await createMergeFile("listVideo", videoUrlList, saveLocation, "ts");
  next();
}

export async function createAudioMergeFile(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { audioUrlList, saveLocation } = req;
  await createMergeFile("listAudio", audioUrlList, saveLocation, "aac");
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
