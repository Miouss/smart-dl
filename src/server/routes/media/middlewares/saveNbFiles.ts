import { promises } from "fs";

import { PROCESSING_FOLDER } from "../../../../constants/constants";
import { Response, NextFunction } from "express";

export async function saveNbFiles(req: any, _: Response, next: NextFunction) {
  const nbFiles = req.audioUrlList.length;

  await promises.writeFile(`${PROCESSING_FOLDER}/number.txt`, `${nbFiles}`, {
    flag: "w",
  });

  next();
}
