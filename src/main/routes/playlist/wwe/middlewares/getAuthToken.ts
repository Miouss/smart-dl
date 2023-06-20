import { Response, NextFunction } from "express";

import {
  startLogProgress,
  successLogProgress,
} from "../../../../utils/logProgress";

import { createHeader, fetchResponse } from "../../../../utils";

import { LOGIN_ENDPOINT } from "../../../../../config";
import { createOptions } from "../../utils";


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

  const body = {
    id: username,
    secret: password,
  };

  const options = createOptions("POST", header, body);

  try {
    const data: Tokens = await fetchResponse(
      "json",
      LOGIN_ENDPOINT,
      options,
      "Credentials incorrect"
    );

    req.authToken = data.authorisationToken;

    successLogProgress("auth");
    next();
  } catch (err) {
    next(err);
  }
}
