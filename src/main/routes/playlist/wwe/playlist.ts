import { Router } from "express";
import {
  startProcess,
  endProcess,
  getAuthToken,
  getCredentials,
  getVodDetails,
  getVodPlaylist,
  saveConfig,
} from "./middlewares";

import { getAvailableStreams, errorHandler } from "../middlewares";

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
