import { Response, NextFunction } from "express";

export async function getMediaId(req: any, _: Response, next: NextFunction) {
  const { videoId } = req.message;

  const url = `https://disney.content.edge.bamgrid.com/svc/content/DmcVideo/version/5.1/region/FR/audience/k-false,l-true/maturity/1899/language/en-GB/contentId/${videoId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const { mediaId } = data.data.DmcVideo.video.mediaMetadata;

    req.message = { ...req.message, mediaId };
  } catch (e) {
    console.error(e);
  } finally {
    next();
  }
}
