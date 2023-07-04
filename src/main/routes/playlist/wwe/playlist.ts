import { Router } from "express";
import {
  startProcess,
  endProcess,
  getAuthToken,
  getVodDetails,
  getVodPlaylist,
} from "./middlewares";

import { getAvailableStreams, errorHandler, getCredentials, saveConfig } from "../middlewares";

const wwe = Router();

wwe.post(
  "/",
  startProcess,
  getCredentials,
  getAuthToken,
  saveConfig,
  getVodDetails,
  getVodPlaylist,
  getAvailableStreams,
  endProcess,
  errorHandler
);

export { wwe };
