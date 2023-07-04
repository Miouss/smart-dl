import { Response } from "express";
import { successLogProgress } from "../../../../utils/logProgress";

export function endProcess(req: any, res: Response) {
  successLogProgress("process", false);

  req.metadata = {
    ...req.metadata,
    domain: "disney",
  };

  res.json(req.metadata);
}
