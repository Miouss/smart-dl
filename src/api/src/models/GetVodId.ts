import fetch from "cross-fetch";

import onError from "../utils/OnError";

import { Metadata } from "../../../types/Metadata";

export default async function getVodId(showUrl = "") {
  const path = showUrl.replace("https://watch.wwe.com", "");

  const response = await fetch(
    `https://cdn.watch.wwe.com/api/page?path=${path}&segments=fr&text_entry_format=html`
  );

  onError(response, "Can't retrieve data from the url provided", 404);

  const data = await response.json();

  const metadata: Metadata = {
    vodId: data.entries[0].item.customFields.DiceVideoId,
    title: data.title,
    thumbnail: data.entries[0].item.images.wallpaper,
    description: data.entries[0].item.shortDescription
  }

  return metadata;
}
