import { ipcMain, dialog } from "electron";
import jsonfile from "jsonfile";

interface Config {
  realm: string;
  apikey: string;
  username: string;
  password: string;
  saveLocation: string;
}
const configPath = "./src/Node/config.json";

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

export async function readConfig() {
  return await jsonfile.readFile(configPath);
}

export async function writeConfig(configData: Config) {
  jsonfile.writeFile(configPath, configData, function (err) {
    if (err) console.error(err);
  });
}
