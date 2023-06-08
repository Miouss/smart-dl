import fetch, { Headers } from "cross-fetch";
import { Request, Response, NextFunction } from "express";

import logProgress from "../../../utils/logProgress";
import checkFetchError from "../../../utils/checkFetchError";

interface Tokens {
  authorisationToken: string;
  refreshToken: string;
}

export async function getAuthToken(
  req: any,
  _: Response,
  next: NextFunction
) {
  const { username, password, realm, apikey } = req;

  const progressMessage = "Authentification";
  logProgress(progressMessage, "start");

  const header = new Headers({
    "Content-Type": "application/json",
    "x-api-key": apikey,
    Realm: realm,
  });

  const options = {
    method: "POST",
    headers: header,
    body: JSON.stringify({ id: username, secret: password }),
  };

  const response = await fetch(
    "https://dce-frontoffice.imggaming.com/api/v2/login",
    options
  );
  checkFetchError(response.ok, "Credentials incorrect");
  logProgress(progressMessage, "success");

  const data: Tokens = await response.json();

  req.authToken = data.authorisationToken;

  next();
}
