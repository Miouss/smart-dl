import fetch from "cross-fetch";
import { Response, NextFunction } from "express";

import {
  startLogProgress,
  successLogProgress,
} from "../../../utils/logProgress";

import { createHeader } from "../../../../utils";

import { LOGIN_ENDPOINT } from "../../../../config";

interface Tokens {
  authorisationToken: string;
  refreshToken: string;
}

export async function getAuthToken(req: any, _: Response, next: NextFunction) {
  const { username, password } = req;

  startLogProgress("auth");

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

  try {
    const response = await fetch(LOGIN_ENDPOINT, options);

    if (!response.ok) throw new Error("Credentials incorrect");

    const data: Tokens = await response.json();

    req.authToken = data.authorisationToken;

    successLogProgress("auth");
    next();
  } catch (err) {
    next(err);
  }
}
