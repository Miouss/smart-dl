import express, { Express } from "express";
import streamDownload from "./api/src/controller/POST/downloadMedia";
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

appExpress.post("/stream/download", streamDownload);
appExpress.post("/stream/playlist", streamPlaylist);

export default appExpress;

export function startServer(appExpress: Express){
  return appExpress.listen(8000);
}

export function stopServer(server: any){
  server.close();
}


export function monitorPublicFolder(){
  appExpress.use(express.static('public'));
  appExpress.use('/testData', express.static('testData'));
}