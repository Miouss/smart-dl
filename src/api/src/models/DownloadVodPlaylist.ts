import fetch from "cross-fetch";
import { Parser } from "m3u8-parser";

export default async function downloadVodPlaylist(playlist: string) {
  const request = await fetch(playlist);
  const data = await request.text();

  const parser = new Parser();
  parser.push(data);
  parser.end();

  const urlList: Array<string> = [];
  parser.manifest.segments.forEach((element: any) => {
    urlList.push(playlist.split("index")[0] + element.uri);
  });

  return urlList;
}
