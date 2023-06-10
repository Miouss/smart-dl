import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import { Parser } from "m3u8-parser";

import {
  startLogProgress,
  successLogProgress,
} from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";

import { PlaylistUrl } from "../../../../types/PlaylistUrl";
import { Media, VideoSelection, AudioSelection } from "../../../../types/Media";

export async function getVodStreams(req: any, _: Response, next: NextFunction) {
  const { vodPlaylist, metadata } = req;

  startLogProgress("vodStreams");

  const response = await fetch(vodPlaylist.url);

  checkFetchError(response.ok, "Can't get playlist url");
  successLogProgress("vodStreams");

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

  mediaSelection.VideoSelection.sort((a, b) => {
    return parseInt(a["Average-Bandwidth"]) >= parseInt(b["Average-Bandwidth"])
      ? -1
      : 1;
  });

  mediaSelection.title = metadata.title;
  mediaSelection.thumbnail = metadata.thumbnail;
  mediaSelection.description = metadata.description;

  req.mediaSelection = mediaSelection;

  next();
}
