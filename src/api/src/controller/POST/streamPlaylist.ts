import Listr from "listr";
import { readFile } from "jsonfile";

import getBearerToken from "../../models/GetBearerToken";
import getVodId from "../../models/GetVodId";
import getVodPlaylist from "../../models/GetVodPlaylist";
import getVodStreams from "../../models/GetVodStreams";

import { Request, Response } from "express";

interface VodData {
  vodId: string;
  vodName: string;
}

interface VodPlaylist {
  url: string;
  prefix: string;
}

interface MediaSelection {
  VideoSelection: Array<VideoSelection>;
  AudioSelection: Array<any>;
  prefix: string;
  vodTitle?: string;
}

interface VideoSelection {
  resolution: string;
  "Average-Bandwidth": string;
  audio: string;
  url: string;
}

export default async function streamPlaylist(req: Request, res: Response) {
  try {
    let bearerToken: string,
      vodData: VodData,
      vodPlaylist: VodPlaylist,
      mediaSelection: MediaSelection = undefined;

    const { username, password, realm, apikey } = await readFile("./src/api/config.json");
    
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

    await dataCollect.run().catch(error => {
      throw new Error(error);
    });

    mediaSelection.VideoSelection.sort((a, b) => {
      return parseInt(a["Average-Bandwidth"]) >=
        parseInt(b["Average-Bandwidth"])
        ? -1
        : 1;
    });

    mediaSelection.vodTitle = vodData.vodName;

    res.status(200);
    res.json(mediaSelection);
  } catch (error) {
    res.status(404);
    res.json({ errorMessage: error });
  }
}
