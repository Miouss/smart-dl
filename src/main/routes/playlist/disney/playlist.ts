import { Router } from "express";

import {
  startProcess,
  getVideoId,
  getMetadata,
  getSources,
  endProcess,
  getAuthToken,
} from "./middlewares";

import { getAvailableStreams, errorHandler, getCredentials, saveConfig } from "../middlewares";

const disney = Router();

disney.post(
  "/",
  startProcess,
  getCredentials,
  getAuthToken,
  saveConfig,
  getVideoId,
  getMetadata,
  getSources,
  getAvailableStreams,
  endProcess,
  errorHandler
);

export { disney };
