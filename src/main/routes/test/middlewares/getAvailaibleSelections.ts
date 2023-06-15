import { Response, NextFunction } from "express";
import { createParser } from "../../../utils";

export async function getAvailaibleSelections(
  req: any,
  _: Response,
  next: NextFunction
) {
  try {
    const { base, path } = req.message.sources;

    const url = `${base}${path}`;

    const response = await fetch(url);
    const data = await response.text();
    const parser = createParser(data);

    const VideoSelection: any = getVideoSelection(parser);
    sortVideoSelection(VideoSelection);

    const AudioSelection: any = getAudioSelection(parser);

    const prefixArr = url.split("/");
    prefixArr.pop();
    const prefix = prefixArr.join("/") + "/";

    const mediaSelection: any = {
      AudioSelection,
      VideoSelection,
      prefix,
    };

    req.message = { ...req.message, mediaSelection };
  } catch (e) {
    console.error(e);
  } finally {
    next();
  }
}

function getAudioSelection(parser: any) {
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

function getVideoSelection(parser: any) {
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

  return videoSelection;
}

function sortVideoSelection(videoSelection: any) {
  videoSelection.sort((a: any, b: any) => {
    return parseInt(a["Average-Bandwidth"]) >= parseInt(b["Average-Bandwidth"])
      ? -1
      : 1;
  });
}
