import { Router } from "express";

import {
  getVideoId,
  getMetadata,
  getSources,
  sendResponse,
  getAuthToken,
  errorHandler,
} from "./middlewares";

import { getAvailableStreams } from "../middlewares";

const disney = Router();

disney.post(
  "/",
  getAuthToken,
  getVideoId,
  getMetadata,
  getSources,
  getAvailableStreams,
  sendResponse,
  errorHandler
);

export { disney };
