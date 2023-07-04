import { Router } from "express";

import {
    startProcess,
    endProcess,
    mergeDownloadedFiles,
    saveNbFiles,
    checkCancelStatus,
    errorHandler,
    getSaveLocation,
    createAudioMergeFile,
    createVideoMergeFile,
    getPlaylistUrl,
    downloadAudioFrags,
    downloadVideoFrags,
  } from "../middlewares";

const disney = Router();

disney.post("/", 
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

export { disney };
