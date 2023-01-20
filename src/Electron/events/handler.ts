import { ipcMain, dialog } from "electron";
import jsonfile from "jsonfile";
import { promises as fs } from "fs";

interface Config {
  realm: string;
  apikey: string;
  username: string;
  password: string;
  saveLocation: string;
}
const API_KEY = "cca51ea0-7837-40df-a055-75eb6347b2e7";
const REALM = "dce.wwe";

const configPath = `${process.execPath}/../config.json`;

ipcMain.handle("choose-save-location-dialog", chooseSaveLocationDialog);
ipcMain.handle("get-saved-credentials", getSavedCredentials);
ipcMain.handle("get-save-location", getSaveLocation);

async function chooseSaveLocationDialog() {
  const response = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const configData = await readConfig();

  configData.saveLocation = response.filePaths[0];

  await writeConfig(configData);

  return configData.saveLocation;
}

async function getSavedCredentials() {
  const configData = await readConfig();

  return configData.username;
}

async function getSaveLocation() {
  const configData = await readConfig();

  return configData.saveLocation;
}

export async function createConfig() {
  const configData: Config = {
    realm: REALM,
    apikey: API_KEY,
    username: "",
    password: "",
    saveLocation: "",
  };
  try {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fs.mkdir(`${process.execPath}/../processing`).then().catch(() => {});
    await fs.access(configPath);
  } catch (err) {
    await writeConfig(configData);
  }
}

export async function readConfig() {
  return await jsonfile.readFile(configPath);
}

export async function writeConfig(configData: Config) {
  jsonfile.writeFile(configPath, configData, function (err) {
    if (err) console.error(err);
  });
}
