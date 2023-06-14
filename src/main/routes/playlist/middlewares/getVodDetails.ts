import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import {
  startLogProgress,
  successLogProgress,
} from "../../../utils/logProgress";

import { Metadata } from "../../../../types/Metadata";
import { BASE_URL, VOD_DETAILS_ENDPOINT } from "../../../../config";

export async function getVodDetails(req: any, _: Response, next: NextFunction) {
  startLogProgress("vodDetails");

  const showUrl = req.body.url;

  const path = showUrl.replace(BASE_URL, "");

  try {
    const response = await fetch(VOD_DETAILS_ENDPOINT + path);

    if (!response.ok) throw Error("Can't retrieve data from the url provided");

    const data = await response.json();

    const { customFields, images, shortDescription } = data.entries[0].item;

    const metadata: Metadata = {
      vodId: customFields.DiceVideoId,
      title: data.title,
      thumbnail: images.wallpaper,
      description: shortDescription,
    };

    req.metadata = metadata;

    successLogProgress("vodDetails");
    next();
  } catch (err) {
    next(err);
  }
}
