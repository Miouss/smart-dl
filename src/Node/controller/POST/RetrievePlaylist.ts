import { Request, Response } from "express";

import getAuthToken from "../../models/POST/RetrievePlaylist/getAuthToken";
import getVodDetails from "../../models/POST/RetrievePlaylist/getVodDetails";
import getVodPlaylistUrl from "../../models/POST/RetrievePlaylist/getVodPlaylistUrl";
import getVodStreams from "../../models/POST/RetrievePlaylist/getVodStreams";

import logProgress from "../../utils/logProgress";

import { Media } from "../../../types/Media";
import { Metadata } from "../../../types/Metadata";
import { PlaylistUrl } from "../../../types/PlaylistUrl";

import { readConfig, writeConfig } from "../../../Electron/events/handler";

export default async function RetrievePlaylist(req: Request, res: Response) {
  const logProgressMessage = "Collecting VOD's data";
  logProgress(logProgressMessage, "start", false);

  try {
    const configData = await readConfig();

    const realm: string = configData.realm;
    const apikey: string = configData.apikey;
    let username: string | undefined = undefined;
    let password: string | undefined = undefined;

    if (req.body.useSavedCredentials) {
      username = configData.username;
      password = configData.password;
    } else {
      username = req.body.account.username;
      password = req.body.account.password;
    }

    const authToken = await getAuthToken(username, password, realm, apikey);

    req.body.saveCredentials && writeConfig({ ...configData, username, password });
    

    const vodDetails: Metadata = await getVodDetails(req.body.url);

    const vodPlaylistUrl: PlaylistUrl = await getVodPlaylistUrl(
      authToken,
      vodDetails.vodId,
      realm,
      apikey
    );

    const mediaSelection: Media = await getVodStreams(vodPlaylistUrl);

    mediaSelection.VideoSelection.sort((a, b) => {
      return parseInt(a["Average-Bandwidth"]) >=
        parseInt(b["Average-Bandwidth"])
        ? -1
        : 1;
    });

    mediaSelection.title = vodDetails.title;
    mediaSelection.thumbnail = vodDetails.thumbnail;
    mediaSelection.description = vodDetails.description;

    logProgress(logProgressMessage, "success", false);

    res.status(200);
    res.json(mediaSelection);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
}
