import { Response } from "express";
import { successLogProgress } from "../../../utils/logProgress";

export function endProcess(req: any, res: Response) {
  const { mediaSelection } = req;
  successLogProgress("process", false);

  res.status(200);
  res.json(mediaSelection);
}
