import { Response, NextFunction } from "express";
import { writeConfig } from "../../../../../../electron/events/handler";

export function saveConfig(req: any, _: Response, next: NextFunction) {
  const { username, password, configData } = req;

  if (req.body.saveCredentials)
    writeConfig({ ...configData, username, password });

  next();
}
