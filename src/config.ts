import electron from "electron";

const APP_PATH = electron.app.getAppPath();

const PROCESSING_FOLDER = `${APP_PATH}/processing`;

const CONFIG_PATH = `${APP_PATH}/config.json`;

const API_KEY = "cca51ea0-7837-40df-a055-75eb6347b2e7";
const REALM = "dce.wwe";

const BASE_URL = "https://watch.wwe.com";
const LOGIN_ENDPOINT = "https://dce-frontoffice.imggaming.com/api/v2/login";
const VOD_DETAILS_ENDPOINT = `https://cdn.watch.wwe.com/api/page?segments=fr&text_entry_format=html&path=`;
const VOD_PLAYLIST_ENDPOINT = `https://dce-frontoffice.imggaming.com/api/v3/stream/vod/`;

export {
  APP_PATH,
  PROCESSING_FOLDER,
  CONFIG_PATH,
  API_KEY,
  REALM,
  BASE_URL,
  LOGIN_ENDPOINT,
  VOD_DETAILS_ENDPOINT,
  VOD_PLAYLIST_ENDPOINT,
};
