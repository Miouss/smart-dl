import { NextFunction, Response } from "express";
import logProgress from "../../../utils/logProgress";

export function startProcess(req: any, _: Response, next: NextFunction) {
  const logProgressMessage = "Collecting VOD's data";
  logProgress(logProgressMessage, "start", false);

  req.logProgressMessage = logProgressMessage;

  next();
}
