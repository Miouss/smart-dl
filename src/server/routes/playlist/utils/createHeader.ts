import { Headers } from "cross-fetch";
import { API_KEY, REALM } from "../../../../config";

export type HeaderOptions = {
  contentType?: boolean;
  apikey?: boolean;
  realm?: boolean;
  authToken?: boolean;
};

export function createHeader(options: HeaderOptions) {
  const headers = new Headers();

  options.contentType && headers.append("Content-Type", "application/json");
  options.apikey && headers.append("x-api-key", API_KEY);
  options.realm && headers.append("Realm", REALM);
  options.authToken &&
    headers.append("Authorization", `Bearer ${options.authToken}`);

  return headers;
}
