import { Response, NextFunction } from "express";

export function getVideoId(req: any, _: Response, next: NextFunction) {
  const { url } = req.body;
  const lastSlashIndex = url.lastIndexOf("/");

  req.videoId = url.substring(lastSlashIndex + 1);

  next();
}
