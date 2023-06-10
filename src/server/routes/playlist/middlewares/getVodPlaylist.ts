import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import {
  startLogProgress,
  successLogProgress,
} from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";
import { createHeader } from "../utils";

import { VOD_PLAYLIST_ENDPOINT } from "../../../../config";

interface PlaylistUrl {
  url: string;
  prefix: string;
}

export async function getVodPlaylist(
  req: any,
  _: Response,
  next: NextFunction
) {
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

  try {
    const response = await fetch(VOD_PLAYLIST_ENDPOINT + vodId, options);

    if (!response.ok)
      throw new Error(
        `Request to retrieve url playlists of vod id ${vodId} failed`
      );

    const data = await response.json();

    const response2 = await fetch(data.playerUrlCallback);

    if (!response.ok)
      throw new Error(`Can't access list of available m3u8 playlist`);

    const data2 = await response2.json();

    const { url } = data2.hls[data2.hls.length - 1];

    const vodPlaylist: PlaylistUrl = {
      url,
      prefix: url.split("master")[0],
    };

    req.vodPlaylist = vodPlaylist;

    successLogProgress("vodPlaylist");
    next();
  } catch (err) {
    next(err);
  }
}
