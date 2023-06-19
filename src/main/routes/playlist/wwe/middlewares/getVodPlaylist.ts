import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import {
  startLogProgress,
  successLogProgress,
} from "../../../../utils/logProgress";
import { createHeader } from "../../../../utils";

import { VOD_PLAYLIST_ENDPOINT } from "../../../../../config";
import { fetchResponse } from "../../utils";

interface PlaylistUrl {
  url: string;
  prefix: string;
}

export async function getVodPlaylist(
  req: any,
  _: Response,
  next: NextFunction
) {
  try {
    startLogProgress("vodPlaylist");

    const { authToken } = req;
    const { vodId } = req.metadata;

    const header = createHeader({
      apikey: true,
      realm: true,
      authToken: authToken,
    });

    const options = {
      headers: header,
    };

    const data = await fetchResponse(
      "json",
      VOD_PLAYLIST_ENDPOINT + vodId,
      options,
      `Request to retrieve url playlists of vod id ${vodId} failed`
    );

    const data2 = await fetchResponse(
      "json",
      data.playerUrlCallback,
      undefined,
      `Can't access list of available m3u8 playlist`
    );

    const { url } = data2.hls[data2.hls.length - 1];

    const src: PlaylistUrl = {
      url,
      prefix: url.split("master")[0],
    };

    req.src = src;

    successLogProgress("vodPlaylist");
    next();
  } catch (err) {
    next(err);
  }
}
