import { ipcMain, dialog } from "electron";
import jsonfile from "jsonfile";

import getWindow from "../index";

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

async function addOutputPath() {
  const response = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  const configData = await readConfig();

  configData.outputPath = response.filePaths[0];

  writeConfig(configData);
}

async function getOutputPath() {
  const configData = await readConfig();
  getWindow().webContents.send("output-path-retrieved", configData.outputPath);
}

async function readConfig() {
  return await jsonfile.readFile(configPath);
}

async function writeConfig(configData: Config) {
  jsonfile.writeFile(configPath, configData, function (err) {
    if (err) console.error(err);
    else getWindow().webContents.send("output-path-added", configData.outputPath);
  });
}
