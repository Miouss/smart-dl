import { Response, NextFunction } from "express";

export async function getSources(req: any, _: Response, next: NextFunction) {
  try {
    const { mediaId } = req.message;

    const url = `https://disney.playback.edge.bamgrid.com/media/${mediaId}/scenarios/ctr-limited`;
    const header = {
      "Content-Type": "application/json",
      Accept: "application/vnd.media-service+json; version=6",
      "x-dss-feature-filtering": "true",
      authorization:
        "eyJ6aXAiOiJERUYiLCJraWQiOiJ0Vy10M2ZQUTJEN2Q0YlBWTU1rSkd4dkJlZ0ZXQkdXek5KcFFtOGRJMWYwIiwiY3R5IjoiSldUIiwiZW5jIjoiQzIwUCIsImFsZyI6ImRpciJ9..yzPgDh5Uy4Hh723x.UpivTLXDLpJ1p3jqsMaXR6_xmWS06P_E1G3lDPr9q20Yqb0I4TayJSqObj5k7561exsNNoe3itw1jh0qvdWYAb5FvScnwqrvMI6yron8IsQ3NoK5XhPSDxXt63UUI3WyoruO0dKaE_RpaHmk_D3dl3U3PcMHcoVjjDO5sDxIL1C7XGq4DX1bzf1jPBLe6UidpO5F0x2WSay3Asbs-E63-REeqnjbmqcIQRQHVwhfinkTgforYit-Tr0C2jDO0oAtKa26PkxzDzIa0RlbiyinI0v7l0KRK4YjqP315IOWkXgnjKKOo5P9Lx68OOECzEcAqONQ2f9Afy1cmhsx2edVKDyvTevjU1bRvmsb…Uc8muhn1n7dxzBwu9LYO7VU3WzW9D7SmfhTLAD0MtBDji-fPS7ddTlKdg1oelmp-NDMHHD1t8vtD4Ws9244DXNLSmJzJJffxupNiZLNI8wAg7fQFE_J3-Ge4kftcMmFDCRt1rc7xUfSZYjN2n0LPkvjHIt4vlTbCmVA9_Rr_2C6g_a_lmAaDtQ4TuZFvMRFJ_l3PayNXZo5ii7Vpr7TkN9LyNis5VU9x8eX2qzyEDHAJ_2uOApWrR9ZlYzVr9wD0ypMGjLgeGNvnj-_x-xqAtUYzK6ELFkBCh0VE-h3jEfD1p8SDw3IIuxFLICT-7btPC9vl9W47Eyei0MMbknqWAXwR4H1v7yx-rI7OCMPlC_AVHIlcTWtvSMKwNHC77Qox9KVjlBmqq2IcrDnZzeDRi5v5O0C8PhaXWdThWV4ZwU4HT9Cs00I3dtCVSInIhombS5gx3OQU3HSj_acm3aVDiQwPrFcCEXT2C1UVyQk.EmaLobtyXzGzQjg8tz8YxQ",
    };

    const body = {
      playback: {
        attributes: {
          resolution: { max: ["1280x720"] },
          protocol: "HTTPS",
          assetInsertionStrategy: "SGAI",
        },
      },
    };

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(await response.json());

    const data = await response.json();
    console.log(data);

    const { base, path } = data.stream.sources[0].complete;
    const sources = { base, path };

    req.message = { ...req.message, sources };
  } catch (e) {
    console.log(e);
  } finally {
    next();
  }
}
