import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import logProgress from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";

import { Metadata } from "../../../../types/Metadata";
import { BASE_URL, VOD_DETAILS_ENDPOINT } from "../../../../config";

export async function getVodDetails(req: any, _: Response, next: NextFunction) {
  const showUrl = req.body.url;
  const progressMessage = "Retrieving VOD details";
  logProgress(progressMessage, "start");

  const path = showUrl.replace(BASE_URL, "");

  const response = await fetch(VOD_DETAILS_ENDPOINT + path);

  checkFetchError(response.ok, "Can't retrieve data from the url provided");
  logProgress(progressMessage, "success");

  const data = await response.json();

  const metadata: Metadata = {
    vodId: data.entries[0].item.customFields.DiceVideoId,
    title: data.title,
    thumbnail: data.entries[0].item.images.wallpaper,
    description: data.entries[0].item.shortDescription,
  };

  req.metadata = metadata;

  next();
}
