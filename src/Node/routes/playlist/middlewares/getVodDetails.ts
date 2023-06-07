import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import logProgress from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";

import { Metadata } from "../../../../types/Metadata";

export async function getVodDetails(
  req: any,
  _: Response,
  next: NextFunction
) {
  const showUrl = req.body.url;
  const progressMessage = "Retrieving VOD details";
  logProgress(progressMessage, "start");

  const path = showUrl.replace("https://watch.wwe.com", "");

  const response = await fetch(
    `https://cdn.watch.wwe.com/api/page?path=${path}&segments=fr&text_entry_format=html`
  );

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
