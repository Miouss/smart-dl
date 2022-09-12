import fetch from "cross-fetch";

import { Parser } from "m3u8-parser";

import onError from "../utilFcts/OnError";

interface PlaylistUrl {
  url: string;
  prefix: string,
}

interface MediaSelection {
  VideoSelection: Array<VideoSelection>,
  AudioSelection: Array<any>,
  prefix: string,
  vodTitle?:string
}

interface VideoSelection{
  resolution: string,
  "Average-Bandwidth": string,
  audio: string,
  url: string,
}


export default async function getVodStreams(vodPlaylist: PlaylistUrl) {
  const response = await fetch(vodPlaylist.url);

  onError(response, "Can't get playlist url");

  const data = await response.text();

  const parser = new Parser();
  parser.push(data);
  parser.end();

  const videoManifest = parser.manifest.playlists;

  const videoSelection: Array<VideoSelection> = [];

  videoManifest.forEach((element: any) => {
    videoSelection.push({
      resolution: `${element.attributes.RESOLUTION.width}x${element.attributes.RESOLUTION.height}`,
      "Average-Bandwidth": element.attributes["AVERAGE-BANDWIDTH"],
      audio: element.attributes.AUDIO,
      url: element.uri,
    });
  });

  const audioSelection = parser.manifest.mediaGroups.AUDIO;

  const mediaSelection: MediaSelection = {
    AudioSelection: audioSelection,
    VideoSelection: videoSelection,
    prefix: vodPlaylist.prefix,
  }

  return mediaSelection;
}
