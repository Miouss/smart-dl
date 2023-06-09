import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import logProgress from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";
import { createHeader } from "../utils";

import { LOGIN_ENDPOINT } from "../../../../config";

interface Tokens {
  authorisationToken: string;
  refreshToken: string;
}

export async function getAuthToken(req: any, _: Response, next: NextFunction) {
  const { username, password } = req;

  const progressMessage = "Authentification";
  logProgress(progressMessage, "start");

  const header = createHeader({
    contentType: true,
    apikey: true,
    realm: true,
  });

  const options = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ id: username, secret: password }),
  };

  const response = await fetch(
    LOGIN_ENDPOINT,
    options
  );

  checkFetchError(response.ok, "Credentials incorrect");
  logProgress(progressMessage, "success");

  const data: Tokens = await response.json();

  req.authToken = data.authorisationToken;

  next();
}
