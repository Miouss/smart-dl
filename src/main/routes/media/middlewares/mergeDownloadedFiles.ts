import { mergeVideo, mergeAudio, mergeParts } from "../utils/tasks/merging";
import { deleteFrags, deleteParts } from "../utils/tasks/deleting";
import { Response, NextFunction } from "express";

export async function mergeDownloadedFiles(
  req: any,
  _: Response,
  next: NextFunction
) {
  try {
    const { videoUrlList, audioUrlList, saveLocation, ext } = req;
    const { vodTitle } = req.body;

    await mergeVideo(videoUrlList, saveLocation, ext);
    await mergeAudio(audioUrlList, saveLocation, ext);
    await deleteFrags(saveLocation, ext);
    await mergeParts(saveLocation, vodTitle, ext);
    await deleteParts(saveLocation, ext);
    next();
  } catch (err) {
    next(new Error("cancel"));
  }
}
