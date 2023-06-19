import { Response } from "express";
import { successLogProgress } from "../../../../utils/logProgress";

export function endProcess(req: any, res: Response) {
  successLogProgress("process", false);
  
  req.metadata = {
    ...req.metadata,
    domain: "wwe",
  };

  res.status(200);
  res.json(req.metadata);
}
