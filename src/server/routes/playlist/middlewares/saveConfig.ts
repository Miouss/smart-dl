import { Response, NextFunction } from "express";
import { writeConfig } from "../../../../Electron/events/handler";

export function saveConfig(req: any, _: Response, next: NextFunction) {
  const { saveCredentials } = req.body;
  const { username, password, configData } = req;
  
  if (saveCredentials) writeConfig({ ...configData, username, password });
  
  next();
}
