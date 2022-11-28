// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("notificationAPI", {
  sendNotification: () => {
    ipcRenderer.send("notify", process.versions.node);
  },
});

contextBridge.exposeInMainWorld("fileSystemAPI", {
  openFileSystemDialog: () => {
    ipcRenderer.send("openFSDialogue");
  },
});

contextBridge.exposeInMainWorld("downloadAPI", {
  onDownloadFullyStarts: (callback: any) => {
    ipcRenderer.on("download-fully-starts", callback);
  },
  onRecoveringFragsPlaylistsStarts: (callback: any) => {
    ipcRenderer.on("recovering-frags-playlists-starts", callback);
  },
  onRecoveringFragsPlaylistsEnds: (callback: any) => {
    ipcRenderer.on("recovering-frags-playlists-ends", callback);
  },
  onDownloadingFragsStarts: (callback: any) => {
    ipcRenderer.on("downloading-frags-starts", callback);
  },
  onUpdateDownloadSteps: (callback: any) => {
    ipcRenderer.on("update-download-steps", callback);
  },
  onDownloadingFragsEnds: (callback: any) => {
    ipcRenderer.on("downloading-frags-ends", callback);
  },
  onMergingStarts: (callback: any) => {
    ipcRenderer.on("merging-starts", callback);
  },
  onMergingVideoStarts: (callback: any) => {
    ipcRenderer.on("merging-video-starts", callback);
  },
  onMergingVideoEnds: (callback: any) => {
    ipcRenderer.on("merging-video-ends", callback);
  },
  onMergingAudioStarts: (callback: any) => {
    ipcRenderer.on("merging-audio-starts", callback);
  },
  onMergingAudioEnds: (callback: any) => {
    ipcRenderer.on("merging-audio-ends", callback);
  },
  onDeletingFragsStarts: (callback: any) => {
    ipcRenderer.on("deleting-frags-starts", callback);
  },
  onDeletingFragsEnds: (callback: any) => {
    ipcRenderer.on("deleting-frags-ends", callback);
  },
  onMergingPartsStarts: (callback: any) => {
    ipcRenderer.on("merging-parts-starts", callback);
  },
  onMergingPartsEnds: (callback: any) => {
    ipcRenderer.on("merging-parts-ends", callback);
  },
  onDeletingPartsStarts: (callback: any) => {
    ipcRenderer.on("deleting-parts-starts", callback);
  },
  onDeletingPartsEnds: (callback: any) => {
    ipcRenderer.on("deleting-parts-ends", callback);
  },
  onMergingEnds: (callback: any) => {
    ipcRenderer.on("merging-ends", callback);
  },
  onDownloadFullyEnds: (callback: any) => {
    ipcRenderer.on("download-fully-ends", callback);
  },
});
