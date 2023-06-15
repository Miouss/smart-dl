import { Response, NextFunction } from "express";

export function getVideoId(req: any, res: Response, next: NextFunction) {
  const { url } = req.body;
  const lastSlashIndex = url.lastIndexOf("/");
  const videoId = url.substring(lastSlashIndex + 1);
  req.message = { ...req.message, videoId };

  next();
}
