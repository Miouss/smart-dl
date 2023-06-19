import { Response } from "express";

export function sendResponse(req: any, res: Response) {
  req.metadata = {
    ...req.metadata,
    domain: "disney",
  };

  res.json(req.metadata);
}
