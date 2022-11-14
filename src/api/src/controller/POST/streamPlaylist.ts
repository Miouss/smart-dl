import Listr from "listr";
import jsonfile from "jsonfile";

import getBearerToken from "../../models/GetBearerToken";
import getVodId from "../../models/GetVodId";
import getVodPlaylist from "../../models/GetVodPlaylist";
import getVodStreams from "../../models/GetVodStreams";

import { Request, Response } from "express";

import { Media } from "../../../../types/Media"
import { Metadata } from "../../../../types/Metadata";
import { PlaylistUrl } from "../../../../types/PlaylistUrl";


export default async function streamPlaylist(req: Request, res: Response) {
  console.log(req.body);

  const configPath = "./src/api/config.json";
  const configData =  await jsonfile.readFile(configPath);

  const realm = configData.realm;
  const apikey = configData.apikey;
  let username: string | undefined = undefined;
  let password: string | undefined = undefined;

  if(req.body.saveCredentials){
    configData.username = req.body.account.username;
    configData.password = req.body.account.password;

    jsonfile.writeFile(configPath, configData, function (err) {
      if (err) console.error(err);
    });
  }else if(req.body.useSavedCredentials){
    username = configData.username;
    password = configData.password;
  }

  if(req.body.saveCredentials || !req.body.useSavedCredentials){
    username = req.body.account.username;
    password = req.body.account.password;
  }
  
  try {
    let bearerToken: string,
      vodData: Metadata,
      vodPlaylist: PlaylistUrl,
      mediaSelection: Media;

    
    const dataCollectList = new Listr([
      {
        title: "Checking Authentification",
        task: async () =>
          (bearerToken = await getBearerToken(
            username,
            password,
            realm,
            apikey
          )),
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
            realm as string,
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
    console.log(err.code);
  }
}
