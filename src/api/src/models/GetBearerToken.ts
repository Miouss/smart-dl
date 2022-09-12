import fetch, { Headers } from "cross-fetch";

import onError from "../utilFcts/OnError";

interface Tokens {
  authorisationToken: string,
  refreshToken: string
}

export default async function getBearerToken(
  username: string,
  password: string,
  realm: string,
  apikey: string
) {
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

  onError(response, "Credentials incorrect");

  const data : Tokens = await response.json();

  return data.authorisationToken;
}
