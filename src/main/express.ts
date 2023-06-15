import express, { Express } from "express";
import { media, playlist, test } from "./routes";

import cors from "cors";

const appExpress = express();

appExpress.use(
  cors({
    origin: "http://localhost:3000",
  })
);

appExpress.use(express.urlencoded({ extended: true }));
appExpress.use(express.json());

appExpress.use("/stream/download", media);
appExpress.use("/stream/playlist", playlist);
appExpress.use("/test", test);

export default appExpress;

export function startServer(appExpress: Express) {
  return appExpress.listen(8000);
}
