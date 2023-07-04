import { Response, NextFunction } from "express";
import { readConfig } from "../../../../../electron/events/handler";
import {
  startLogProgress,
  successLogProgress,
} from "../../../utils/logProgress";

export async function getCredentials(
  req: any,
  _: Response,
  next: NextFunction
) {
  try {
    startLogProgress("credentials");

    const configData = await readConfig();

    const { useSavedCredentials, account } = req.body;
    const { username, password } = useSavedCredentials
      ? configData.credentials[req.domain]
      : account;

    Object.assign(req, {
      username,
      password,
      configData,
    });

    successLogProgress("credentials");
    next();
  } catch (err) {
    next(err);
  }
}
