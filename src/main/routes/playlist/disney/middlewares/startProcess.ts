import { NextFunction, Response } from "express";
import { startLogProgress } from "../../../../utils/logProgress";

export function startProcess(req: any, _: Response, next: NextFunction) {
  startLogProgress("process", false);

  req.domain = "disney";

  next();
}
