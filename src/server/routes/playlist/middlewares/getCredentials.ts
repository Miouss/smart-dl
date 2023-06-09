import { Response, NextFunction } from "express";
import { readConfig } from "../../../../Electron/events/handler";

export async function getCredentials(
  req: any,
  _: Response,
  next: NextFunction
) {
  const configData = await readConfig();
  const { useSavedCredentials } = req.body;

  const username = useSavedCredentials
    ? configData.username
    : req.body.account.username;

  const password = useSavedCredentials
    ? configData.password
    : req.body.account.password;

  Object.assign(req, {
    username,
    password,
    realm: configData.realm,
    apikey: configData.apikey,
    configData,
  });

  next();
}
