import { Response } from "express";
import logProgress from "../../../utils/logProgress";

export function endProcess(req: any, res: Response) {
  const { logProgressMessage, mediaSelection } = req;
  logProgress(logProgressMessage, "success", false);

  res.status(200);
  res.json(mediaSelection);
}
