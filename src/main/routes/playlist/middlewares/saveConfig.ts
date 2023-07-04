import { Response, NextFunction } from "express";
import { writeConfig } from "../../../../../electron/events/handler";

export function saveConfig(req: any, _: Response, next: NextFunction) {
  const { username, password, configData, domain } = req;

  configData.credentials[domain].username = username;
  configData.credentials[domain].password = password;

  if (req.body.saveCredentials) writeConfig({ ...configData });

  next();
}
