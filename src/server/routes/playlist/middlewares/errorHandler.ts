import { Response, NextFunction } from "express";

export async function errorHandler(
  err: any,
  _: any,
  res: Response,
  __: NextFunction
) {
  console.log(`[ERROR] : \n ${err.message}`);

  res.status(500);
  res.send(err.message);
}
