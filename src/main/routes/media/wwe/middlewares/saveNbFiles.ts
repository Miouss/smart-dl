import { promises } from "fs";

import { PROCESSING_FOLDER } from "../../../../../config";
import { Response, NextFunction } from "express";

export async function saveNbFiles(req: any, _: Response, next: NextFunction) {
  const nbFiles = req.audioUrlList.length;
  
  const filePath = `${PROCESSING_FOLDER}/number.txt`;
  const data = `${nbFiles}`;
  const options = { flag: "w" };

  await promises.writeFile(filePath, data, options);

  next();
}
