import { Response, NextFunction } from "express";
import { createParser, fetchResponse } from "../../../../utils";

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
  const data = await fetchResponse(
    "text",
    playlist,
    undefined,
    "Can't get playlist url"
  );

  const parser = createParser(data);
  const { segments } = parser.manifest;

  const urlList: Array<string> = [];
  segments.forEach((element: any) => {
    urlList.push(playlist.split("index")[0] + element.uri);
  });

  return urlList;
}
