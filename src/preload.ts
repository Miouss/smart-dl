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
