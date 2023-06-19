import fetch from "cross-fetch";
import { Response, NextFunction } from "express";
import { createParser } from "../../../../utils";

export async function getPlaylistUrl(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { videoUrl, audioUrl } = req.body;

  try {
    req.videoUrlList = await retrievePlaylist(videoUrl);
    req.audioUrlList = await retrievePlaylist(audioUrl);

    next();
  } catch (err) {
    next(err);
  }
}

async function retrievePlaylist(playlist: string) {
  const request = await fetch(playlist);
  if (!request.ok) throw new Error("Can't get playlist url");

  const data = await request.text();

  const parser = createParser(data);
  const { segments } = parser.manifest;

  const urlList: Array<string> = [];
  segments.forEach((element: any) => {
    urlList.push(playlist.split("index")[0] + element.uri);
  });

  return urlList;
}
