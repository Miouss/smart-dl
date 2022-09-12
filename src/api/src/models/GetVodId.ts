import fetch from "cross-fetch";

import onError from "../utilFcts/OnError";

interface Metadata {
  vodId: string,
  vodName: string,
}

export default async function getVodId(showUrl: string) {
  const path = showUrl.replace("https://watch.wwe.com", "");

  const response = await fetch(
    `https://cdn.watch.wwe.com/api/page?path=${path}&segments=fr&text_entry_format=html`
  );

  onError(response, "Can't retrieve data");

  const data = await response.json();

  const metadata: Metadata = {
    vodId: data.entries[0].item.customFields.DiceVideoId,
    vodName: data.title,
  }

  return metadata;
}
