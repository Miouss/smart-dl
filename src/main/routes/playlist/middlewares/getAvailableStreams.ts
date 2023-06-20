import { Response, NextFunction } from "express";

import {
  startLogProgress,
  successLogProgress,
  createParser,
  fetchResponse,
} from "../../../utils";

import { VideoSelection, AudioSelection } from "../../../../types/Media";

export async function getAvailableStreams(
  req: any,
  _: Response,
  next: NextFunction
) {
  startLogProgress("vodStreams");

  const { src } = req;

  try {
    const data = await fetchResponse(
      "text",
      src.url,
      undefined,
      "Can't get playlist url"
    );

    const parser = createParser(data);

    const VideoSelection: Array<VideoSelection> = getVideoStreams(parser);

    const AudioSelection: Record<string, AudioSelection> =
      getAudioStreams(parser);

    const streams: any = {
      video: VideoSelection,
      audio: AudioSelection,
      prefix: src.prefix,
    };

    req.metadata = {
      ...req.metadata,
      streams,
    };

    successLogProgress("vodStreams");
    next();
  } catch (err) {
    next(err);
  }
}

function getAudioStreams(parser: any) {
  const audioSelection: any = {};

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

function getVideoStreams(parser: any) {
  const videoSelection: any = [];

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

  sortVideoSelection(videoSelection);

  return videoSelection;
}

function sortVideoSelection(videoSelection: any) {
  videoSelection.sort((a: any, b: any) => {
    return parseInt(a["Average-Bandwidth"]) >= parseInt(b["Average-Bandwidth"])
      ? -1
      : 1;
  });
}
