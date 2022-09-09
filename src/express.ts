import express from "express";
import mockRequest from "./api/src/controller/POST/mockRequest";
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

appExpress.post("/stream/download", mockRequest);

appExpress.post("/stream/playlist", streamPlaylist);

export default appExpress;
