import { Response, NextFunction } from "express";

export async function getSources(req: any, _: Response, next: NextFunction) {
  try {
    const { mediaId, token } = req.message;
    console.log("token", token);
    const url = `https://disney.playback.edge.bamgrid.com/media/${mediaId}/scenarios/ctr-limited`;
    const header = {
      "Content-Type": "application/json",
      Accept: "application/vnd.media-service+json; version=6",
      "x-dss-feature-filtering": "true",
      authorization: token,
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

    const { base, path } = data.stream.sources[0].complete;
    const sources = { base, path };

    req.message = { ...req.message, sources };
  } catch (e) {
    console.log(e);
  } finally {
    next();
  }
}
