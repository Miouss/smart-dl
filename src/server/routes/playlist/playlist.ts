import { Router } from "express";
import {
  startProcess,
  endProcess,
  getAuthToken,
  getCredentials,
  getVodDetails,
  getVodPlaylist,
  getVodStreams,
  saveConfig,
  errorHandler
} from "./middlewares";

const playlist = Router();

playlist.post(
  "/",
  startProcess,
  getCredentials,
  getAuthToken,
  saveConfig,
  getVodDetails,
  getVodPlaylist,
  getVodStreams,
  endProcess,
  errorHandler,
);

export { playlist };
