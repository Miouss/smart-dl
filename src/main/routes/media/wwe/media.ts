import { Router } from "express";
import {
  startProcess,
  endProcess,
  mergeDownloadedFiles,
  saveNbFiles,
  getPlaylistUrl,
  downloadAudioFrags,
  downloadVideoFrags,
  createAudioMergeFile,
  createVideoMergeFile,
  checkCancelStatus,
  errorHandler,
} from "./middlewares";

import { getSaveLocation } from "../middlewares";

const wwe = Router();

wwe.post(
  "/",
  startProcess,
  getSaveLocation,
  checkCancelStatus,
  getPlaylistUrl,
  checkCancelStatus,
  saveNbFiles,
  checkCancelStatus,
  downloadVideoFrags,
  checkCancelStatus,
  downloadAudioFrags,
  checkCancelStatus,
  createVideoMergeFile,
  checkCancelStatus,
  createAudioMergeFile,
  checkCancelStatus,
  mergeDownloadedFiles,
  checkCancelStatus,
  endProcess,
  errorHandler
);

export { wwe };
