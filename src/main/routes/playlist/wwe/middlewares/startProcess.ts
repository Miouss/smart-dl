import { NextFunction, Response } from "express";
import { startLogProgress } from "../../../../utils/logProgress";

export function startProcess(_: any, __: Response, next: NextFunction) {
  startLogProgress("process", false);

  next();
}
