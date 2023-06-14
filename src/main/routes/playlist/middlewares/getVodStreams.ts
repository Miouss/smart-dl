import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import { Parser } from "m3u8-parser";

import {
  startLogProgress,
  successLogProgress,
} from "../../../utils/logProgress";

import { Media, VideoSelection, AudioSelection } from "../../../../types/Media";

export async function getVodStreams(req: any, _: Response, next: NextFunction) {
  startLogProgress("vodStreams");

  const { vodPlaylist, metadata } = req;

  try {
    const response = await fetch(vodPlaylist.url);

    if (!response.ok) throw new Error("Can't get playlist url");

    const data = await response.text();

    const parser = createParser(data);

    const VideoSelection: Array<VideoSelection> = getVideoSelection(parser);
    sortVideoSelection(VideoSelection);

    const AudioSelection: Record<string, AudioSelection> =
      getAudioSelection(parser);

    const mediaSelection: Media = {
      AudioSelection,
      VideoSelection,
      prefix: vodPlaylist.prefix,
    };

    const { title, thumbnail, description } = metadata;

    Object.assign(mediaSelection, { title, thumbnail, description });

    req.mediaSelection = mediaSelection;

    successLogProgress("vodStreams");
    next();
  } catch (err) {
    next(err);
  }
}

function createParser(data: string) {
  const parser = new Parser();
  parser.push(data);
  parser.end();

  return parser;
}

function getAudioSelection(parser: any) {
  const audioSelection: Record<string, AudioSelection> = {};

  const { AUDIO } = parser.manifest.mediaGroups;

  const audioQualities = Object.keys(AUDIO);

  audioQualities.forEach((audioQuality) => {
    audioSelection[audioQuality] = {};

    const params = Object.keys(AUDIO[audioQuality]);

    params.forEach((param) => {
      const { language, uri } = AUDIO[audioQuality][param];

      audioSelection[audioQuality][param] = {
        lang: language,
        url: uri,
      };
    });
  });

  return audioSelection;
}

function getVideoSelection(parser: any) {
  const videoSelection: Array<VideoSelection> = [];

  const videoManifest = parser.manifest.playlists;

  videoManifest.forEach((element: any) => {
    const { attributes, uri } = element;
    const { width, height } = attributes.RESOLUTION;

    videoSelection.push({
      resolution: `${width}x${height}`,
      "Average-Bandwidth": attributes["AVERAGE-BANDWIDTH"].slice(0, -2),
      audio: attributes.AUDIO,
      url: uri,
    });
  });

  return videoSelection;
}

function sortVideoSelection(videoSelection: Array<VideoSelection>) {
  videoSelection.sort((a, b) => {
    return parseInt(a["Average-Bandwidth"]) >= parseInt(b["Average-Bandwidth"])
      ? -1
      : 1;
  });
}
