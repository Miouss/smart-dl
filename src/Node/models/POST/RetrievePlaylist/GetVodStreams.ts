import fetch from "cross-fetch";

import { Parser } from "m3u8-parser";

import logProgress from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";

import { PlaylistUrl } from "../../../../types/PlaylistUrl";
import { Media, VideoSelection, AudioSelection } from "../../../../types/Media";

export default async function GetVodStreams(vodPlaylist: PlaylistUrl) {
  const progressMessage = "Retrieving VOD streams";
  logProgress(progressMessage, "start");

  const response = await fetch(vodPlaylist.url);
  
  checkFetchError(response.ok, "Can't get playlist url");
  logProgress(progressMessage, "success");

  const data = await response.text();

  const parser = new Parser();
  parser.push(data);
  parser.end();

  const videoManifest = parser.manifest.playlists;

  const videoSelection: Array<VideoSelection> = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoManifest.forEach((element: any) => {
    videoSelection.push({
      resolution: `${element.attributes.RESOLUTION.width}x${element.attributes.RESOLUTION.height}`,
      "Average-Bandwidth": element.attributes["AVERAGE-BANDWIDTH"].slice(0, -2),
      audio: element.attributes.AUDIO,
      url: element.uri,
    });
  });

  const audioSelection: Record<string, AudioSelection> = {};

  for (const audioQuality in parser.manifest.mediaGroups.AUDIO) {
    audioSelection[audioQuality] = {};
    for (const param in parser.manifest.mediaGroups.AUDIO[audioQuality]) {
      audioSelection[audioQuality][param] = {
        lang: parser.manifest.mediaGroups.AUDIO[audioQuality][param].language,
        url: parser.manifest.mediaGroups.AUDIO[audioQuality][param].uri,
      };
    }
  }

  const mediaSelection: Media = {
    AudioSelection: audioSelection,
    VideoSelection: videoSelection,
    prefix: vodPlaylist.prefix,
  };

  return mediaSelection;
}
