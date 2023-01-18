import { ipcMain, dialog } from "electron";
import jsonfile from "jsonfile";

import fireEvent from "../index";

interface Config {
  realm: string;
  apikey: string;
  username: string;
  password: string;
  outputPath: string;
}
const configPath = "./src/api/config.json";

ipcMain.on("open-filesystem-dialog", addOutputPath);
ipcMain.on("retrieve-output-path", getOutputPath);
ipcMain.on("retrieve-account", getAccount);

async function addOutputPath() {
  const response = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const configData = await readConfig();

  configData.outputPath = response.filePaths[0];

  await writeConfig(configData);
  fireEvent("output-path-added", configData.outputPath);
}

async function getOutputPath() {
  const configData = await readConfig();
  fireEvent("output-path-retrieved", configData.outputPath);
}

async function getAccount() {
  const configData = await readConfig();
  fireEvent("account-retrieved", configData.username);
}


export async function readConfig() {
  return await jsonfile.readFile(configPath);
}

export async function writeConfig(configData: Config) {
  jsonfile.writeFile(configPath, configData, function (err) {
    if (err) console.error(err);
  });
}
