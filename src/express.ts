import express from "express";
import downloadMedia from "./api/src/controller/POST/downloadMedia";
import streamPlaylist from "./api/src/controller/POST/streamPlaylist";

import cors from "cors";

const appExpress = express();

appExpress.use(
  cors({
    origin: "http://localhost:3000",
  })
);

appExpress.use(express.urlencoded({ extended: true }));
appExpress.use(express.json());

appExpress.post("/stream/download", downloadMedia);

appExpress.post("/stream/playlist", streamPlaylist);

export default appExpress;

export function monitorPublicFolder(){
  appExpress.use(express.static('public'));
  appExpress.use('/testData', express.static('testData'));
}