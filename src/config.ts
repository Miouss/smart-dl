import electron from "electron";

const APP_PATH = electron.app.getAppPath();

const PROCESSING_FOLDER = `${APP_PATH}/processing`;

const CONFIG_PATH = `${APP_PATH}/config.json`;

const API_KEY = "cca51ea0-7837-40df-a055-75eb6347b2e7";
const REALM = "dce.wwe";

export { APP_PATH, PROCESSING_FOLDER, CONFIG_PATH, API_KEY, REALM };
