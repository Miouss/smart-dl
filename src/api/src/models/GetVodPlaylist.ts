import fetch, { Headers } from "cross-fetch";

import onError from "../utilFcts/OnError";

interface PlaylistUrl {
  url: string;
  prefix: string,
}

export default async function getVodPlaylist(
  bearerToken: string,
  vodId: string,
  realm: string,
  apikey: string
) {
  const header = new Headers({
    Authorization: `Bearer ${bearerToken}`,
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

  onError(response, `Request to retrieve url playlists  of vod id ${vodId} failed`);

  const data = await response.json();

  const response2 = await fetch(data.playerUrlCallback);

  onError(response2, "Can't access list of available m3u8 playlist");

  const data2 = await response2.json();

  const playlistUrl: PlaylistUrl = {
    url: data2.hls[data2.hls.length - 1].url,
    prefix: data2.hls[data2.hls.length - 1].url.split("master")[0],
  }

  return playlistUrl;
}
