import { Router } from "express";

import {
  getVideoId,
  getMetadata,
  getSources,
  sendResponse,
  getAuthToken,
} from "./middlewares";

import { getAvailableStreams, errorHandler } from "../middlewares";

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
