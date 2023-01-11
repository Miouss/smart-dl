/* eslint-disable @typescript-eslint/no-explicit-any */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("fileSystemAPI", {
  openFileSystemDialog: () => {
    ipcRenderer.send("openFSDialogue");
  },
});

contextBridge.exposeInMainWorld("downloadAPI", {
  cancelButtonPressed: () => {
    ipcRenderer.send("cancel-button-pressed");
  },

  onCancelStarts: (callback: any) => {
    ipcRenderer.once("cancel-starts", callback);
  },
  onCancelEnds: (callback: any) => {
    ipcRenderer.once("cancel-ends", callback);
  },
  onDownloadFullyStarts: (callback: any) => {
    ipcRenderer.once("download-fully-starts", callback);
  },
  onRecoveringFragsPlaylistsStarts: (callback: any) => {
    ipcRenderer.once("recovering-frags-playlists-starts", callback);
  },
  onRecoveringFragsPlaylistsEnds: (callback: any) => {
    ipcRenderer.once("recovering-frags-playlists-ends", callback);
  },
  onDownloadingFragsStarts: (callback: any) => {
    ipcRenderer.once("downloading-frags-starts", callback);
  },
  onUpdateDownloadSteps: (callback: any) => {
    ipcRenderer.on("update-download-steps", callback);
  },
  onDownloadStepsEnds: (callback: any) => {
    ipcRenderer.once("download-steps-ends", callback);
  },
  onDownloadingFragsEnds: (callback: any) => {
    ipcRenderer.once("downloading-frags-ends", callback);
  },
  onMergingStarts: (callback: any) => {
    ipcRenderer.once("merging-starts", callback);
  },
  onMergingVideoStarts: (callback: any) => {
    ipcRenderer.once("merging-video-starts", callback);
  },
  onMergingVideoEnds: (callback: any) => {
    ipcRenderer.once("merging-video-ends", callback);
  },
  onMergingAudioStarts: (callback: any) => {
    ipcRenderer.once("merging-audio-starts", callback);
  },
  onMergingAudioEnds: (callback: any) => {
    ipcRenderer.once("merging-audio-ends", callback);
  },
  onDeletingFragsStarts: (callback: any) => {
    ipcRenderer.once("deleting-frags-starts", callback);
  },
  onDeletingFragsEnds: (callback: any) => {
    ipcRenderer.once("deleting-frags-ends", callback);
  },
  onMergingPartsStarts: (callback: any) => {
    ipcRenderer.once("merging-parts-starts", callback);
  },
  onMergingPartsEnds: (callback: any) => {
    ipcRenderer.once("merging-parts-ends", callback);
  },
  onDeletingPartsStarts: (callback: any) => {
    ipcRenderer.once("deleting-parts-starts", callback);
  },
  onDeletingPartsEnds: (callback: any) => {
    ipcRenderer.once("deleting-parts-ends", callback);
  },
  onMergingEnds: (callback: any) => {
    ipcRenderer.once("merging-ends", callback);
  },
  onDownloadFullyEnds: (callback: any) => {
    ipcRenderer.once("download-fully-ends", callback);
  },
});
