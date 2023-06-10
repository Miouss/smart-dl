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
  const { authToken } = req;
  const { vodId } = req.metadata;


  startLogProgress("vodPlaylist");

  const header = createHeader({
    apikey: true,
    realm: true,
    authToken: authToken,
  });

  const options = {
    headers: header,
  };

  const response = await fetch(VOD_PLAYLIST_ENDPOINT + vodId, options);

  checkFetchError(
    response.ok,
    `Request to retrieve url playlists of vod id ${vodId} failed`
  );

  const data = await response.json();

  const response2 = await fetch(data.playerUrlCallback);

  checkFetchError(response2.ok, `Can't access list of available m3u8 playlist`);
  successLogProgress("vodPlaylist");

  const data2 = await response2.json();

  const vodPlaylist: PlaylistUrl = {
    url: data2.hls[data2.hls.length - 1].url,
    prefix: data2.hls[data2.hls.length - 1].url.split("master")[0],
  };

  req.vodPlaylist = vodPlaylist;

  next();
}
