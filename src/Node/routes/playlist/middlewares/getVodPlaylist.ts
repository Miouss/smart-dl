import fetch, { Headers } from "cross-fetch";
import { Response, NextFunction } from "express";

import logProgress from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";

interface PlaylistUrl {
  url: string;
  prefix: string;
}

export async function getVodPlaylist(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { realm, apikey, authToken } = req;
  const { vodId } = req.metadata;

  const progressMessage = "Retrieving VOD playlist url";
  logProgress(progressMessage, "start");

  const header = new Headers({
    Authorization: `Bearer ${authToken}`,
    "x-api-key": apikey,
    Realm: realm,
  });

  const options = {
    headers: header,
  };

  const response = await fetch(
    `https://dce-frontoffice.imggaming.com/api/v3/stream/vod/${vodId}`,
    options
  );

  checkFetchError(
    response.ok,
    `Request to retrieve url playlists of vod id ${vodId} failed`
  );

  const data = await response.json();

  const response2 = await fetch(data.playerUrlCallback);

  checkFetchError(response2.ok, `Can't access list of available m3u8 playlist`);
  logProgress(progressMessage, "success");

  const data2 = await response2.json();

  const vodPlaylist: PlaylistUrl = {
    url: data2.hls[data2.hls.length - 1].url,
    prefix: data2.hls[data2.hls.length - 1].url.split("master")[0],
  };

  req.vodPlaylist = vodPlaylist;

  next();
}
