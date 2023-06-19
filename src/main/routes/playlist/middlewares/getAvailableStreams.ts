import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import {
  startLogProgress,
  successLogProgress,
  createParser,
} from "../../../utils";

import { getVideoStreams, getAudioStreams, fetchResponse } from "../utils";

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
