import { Router } from "express";

import {
  getVideoId,
  getMediaId,
  getSources,
  getAvailaibleSelections,
  sendBack,
  getAuthToken,
} from "./middlewares";

const test = Router();

test.post(
  "/",
  getAuthToken,
  getVideoId,
  getMediaId,
  getSources,
  getAvailaibleSelections,
  sendBack
);

export { test };
