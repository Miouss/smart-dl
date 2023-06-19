import express, { Express } from "express";
import { wwe as wweMedia, disney as disneyMedia } from "./routes/media";
import {
  wwe as wwePlaylist,
  disney as disneyPlaylist,
} from "./routes/playlist";

import cors from "cors";

const appExpress = express();

appExpress.use(
  cors({
    origin: "http://localhost:3000",
  })
);

appExpress.use(express.urlencoded({ extended: true }));
appExpress.use(express.json());

appExpress.use("/media/wwe", wweMedia);
appExpress.use("/media/disney", disneyMedia);
appExpress.use("/playlist/wwe", wwePlaylist);
appExpress.use("/playlist/disney", disneyPlaylist);

export default appExpress;

export function startServer(appExpress: Express) {
  return appExpress.listen(8000);
}
