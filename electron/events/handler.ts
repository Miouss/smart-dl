import electron, { ipcMain, dialog } from "electron";
import jsonfile from "jsonfile";
import { promises as fs } from "fs";
import { CONFIG_PATH } from "../../src/config";

interface Config {
  username: string;
  password: string;
  saveLocation: string;
}

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

  const availableCredentials = [];

  if(configData.credentials.wwe.username) availableCredentials.push("wwe");
  if(configData.credentials.disney.username) availableCredentials.push("disney");

  return availableCredentials;
}

async function getSaveLocation() {
  const configData = await readConfig();

  return configData.saveLocation;
}

export async function createConfig() {
  const configData: Config = {
    username: "",
    password: "",
    saveLocation: "",
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  fs.mkdir(`${electron.app.getAppPath()}/processing`).catch(() => {});

  try {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await fs.access(CONFIG_PATH);
  } catch (err) {
    if (err.code === "ENOENT") writeConfig(configData);
  }
}

export async function readConfig() {
  return await jsonfile.readFile(CONFIG_PATH);
}

export async function writeConfig(configData: Config) {
  try {
    await jsonfile.writeFile(CONFIG_PATH, configData);
  } catch (err) {
    console.log("Coucou erreur");
    console.error(err);
  }
}
