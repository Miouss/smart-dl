import { Response, NextFunction } from "express";
import { fetchResponse } from "../../utils";

export async function getMetadata(req: any, _: Response, next: NextFunction) {
  try {
    const url = `https://disney.content.edge.bamgrid.com/svc/content/DmcVideo/version/5.1/region/FR/audience/k-false,l-true/maturity/1899/language/en-GB/contentId/${req.videoId}`;

    const data = await fetchResponse("json", url);

    const { mediaMetadata, text, image, programType } =
      data.data.DmcVideo.video;

    const type = programType === "movie" ? "program" : "series";

    const metadata = {
      vodId: mediaMetadata.mediaId,
      title: text.title.full[type].default.content,
      thumbnail: image.tile["1.78"][type].default.url,
      description: text.description.medium[type].default.content,
    };

    req.metadata = metadata;

    next();
  } catch (err) {
    next(err);
  }
}
