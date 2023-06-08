import { Response, NextFunction } from "express";

export function checkCancelStatus(req: any, _: Response, next: NextFunction) {
  if (req.isCanceled) {
    console.log("Cancelation detected in root");
    next(new Error("cancel"));
  }

  next();
}
