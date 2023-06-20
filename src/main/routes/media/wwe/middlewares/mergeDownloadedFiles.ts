import { mergeVideo, mergeAudio, mergeParts } from "../utils/tasks/merging";
import { deleteFrags, deleteParts } from "../utils/tasks/deleting";
import { Response, NextFunction } from "express";

export async function mergeDownloadedFiles(
  req: any,
  _: Response,
  next: NextFunction
) {
  try {
    const { saveLocation } = req;
    const { vodTitle } = req.body;

    await mergeVideo(saveLocation);
    await mergeAudio(saveLocation);
    await deleteFrags(saveLocation);
    await mergeParts(saveLocation, vodTitle);
    await deleteParts(saveLocation);
    next();
  } catch (err) {
    next(new Error("cancel"));
  }
}
