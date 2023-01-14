import Listr from "listr";
import jsonfile from "jsonfile";

import getBearerToken from "../../models/GetBearerToken";
import getVodId from "../../models/GetVodId";
import getVodPlaylist from "../../models/GetVodPlaylist";
import getVodStreams from "../../models/GetVodStreams";

import { Request, Response } from "express";

import { Media } from "../../../../types/Media";
import { Metadata } from "../../../../types/Metadata";
import { PlaylistUrl } from "../../../../types/PlaylistUrl";

import ErrorWithStatusCode from "../../utils/ErrorWithStatusCode";

import { writeConfig } from "../../../config";

export default async function downloadPlaylist(req: Request, res: Response) {
  try {
    const configPath = "./src/api/config.json";
    const configData = await jsonfile.readFile(configPath);
    if (configData.outputPath === undefined) {
      throw new ErrorWithStatusCode("Please choose a save location", 403);
    }
    const realm: string = configData.realm;
    const apikey: string = configData.apikey;
    let username: string | undefined = undefined;
    let password: string | undefined = undefined;

    if (req.body.saveCredentialsCheckState) {
      username = req.body.account.username;
      password = req.body.account.password;
    } else if (req.body.useSavedCredentialsCheckState) {
      username = configData.username;
      password = configData.password;
    }

    let bearerToken: string,
      vodData: Metadata,
      vodPlaylist: PlaylistUrl,
      mediaSelection: Media;

    const dataCollectList = new Listr([
      {
        title: "Checking Authentification",
        task: async () =>{
          bearerToken = await getBearerToken(
            username,
            password,
            realm,
            apikey
          );

          if (req.body.saveCredentialsCheckState){
            writeConfig({...configData, username, password});
          }
        }
      },
      {
        title: "Getting VOD Identifier",
        task: async () => (vodData = await getVodId(req.body.showUrl)),
      },
      {
        title: "Retrieving VOD's Fragments Playlist",
        task: async () =>
          (vodPlaylist = await getVodPlaylist(
            bearerToken,
            vodData.vodId,
            realm,
            apikey
          )),
      },
      {
        title: "Collecting VOD's Available Resolutions",
        task: async () => (mediaSelection = await getVodStreams(vodPlaylist)),
      },
    ]);

    const dataCollect = new Listr([
      {
        title: "Collecting VOD's data",
        task: () => dataCollectList,
      },
    ]);

    await dataCollect.run();

    mediaSelection.VideoSelection.sort((a, b) => {
      return parseInt(a["Average-Bandwidth"]) >=
        parseInt(b["Average-Bandwidth"])
        ? -1
        : 1;
    });

    mediaSelection.title = vodData.title;
    mediaSelection.thumbnail = vodData.thumbnail;
    mediaSelection.description = vodData.description;

    res.status(200);
    res.json(mediaSelection);
  } catch (err) {
    res.status(err.code);
    res.send(err.message);
  }
}