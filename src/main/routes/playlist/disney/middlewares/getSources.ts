import { Response, NextFunction } from "express";
import { createOptions, fetchResponse } from "../../utils";

export async function getSources(req: any, _: Response, next: NextFunction) {
  try {
    const url = `https://disney.playback.edge.bamgrid.com/media/${req.metadata.vodId}/scenarios/ctr-limited`;
    const header = {
      "Content-Type": "application/json",
      Accept: "application/vnd.media-service+json; version=6",
      "x-dss-feature-filtering": "true",
      authorization: req.token,
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

    const options = createOptions("POST", header, body);

    const data = await fetchResponse("json", url, options);

    const { base, path } = data.stream.sources[0].complete;
    const src = {
      url: base + path,
      prefix: (base + path).split("ctr-")[0],
    };

    req.src = src;

    next();
  } catch (err) {
    next(err);
  }
}
