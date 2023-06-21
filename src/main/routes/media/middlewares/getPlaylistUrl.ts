import { Response, NextFunction } from "express";
import { createParser, fetchResponse } from "../../../utils";
import path from "path";

export async function getPlaylistUrl(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { videoUrl, audioUrl, domain } = req.body;

  try {
    req.videoUrlList = await retrievePlaylist(videoUrl, domain);
    req.audioUrlList = await retrievePlaylist(audioUrl, domain);

    req.ext = {
      video: path.extname(req.videoUrlList[0].split("?")[0]).substring(1),
      audio: path.extname(req.audioUrlList[0].split("?")[0]).substring(1),
    };

    next();
  } catch (err) {
    next(err);
  }
}

async function retrievePlaylist(playlist: string, domain: "wwe" | "disney") {
  const data = await fetchResponse(
    "text",
    playlist,
    undefined,
    "Can't get playlist url"
  );

  const parser = createParser(data);
  console.log(playlist);
  const { segments } = parser.manifest;

  let base: string;

  switch (domain) {
    case "wwe":
      base = playlist.split("index")[0];
      break;
    case "disney":
      base = playlist.split("/r")[0] + "/r/";
      break;
  }

  const urlList: Array<string> = [];
  segments.forEach((element: any) => {
    urlList.push(base + element.uri);
  });

  return urlList;
}
