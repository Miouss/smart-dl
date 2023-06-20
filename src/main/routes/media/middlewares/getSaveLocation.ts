import { Response, NextFunction } from "express";
import { readConfig } from "../../../../../electron/events/handler";

export async function getSaveLocation(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { saveLocation } = await readConfig();

  req.saveLocation = saveLocation;

  next();
}
