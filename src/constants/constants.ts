import electron from "electron";

export const APP_PATH = electron.app.getAppPath();

export const PROCESSING_FOLDER = `${APP_PATH}/processing`;

export const CONFIG_PATH = `${APP_PATH}/config.json`;
export const API_KEY = "cca51ea0-7837-40df-a055-75eb6347b2e7";
export const REALM = "dce.wwe";