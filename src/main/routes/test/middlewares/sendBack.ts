import { Response } from "express";

export function sendBack(req: any, res: Response) {
  res.json(req.message);
}
