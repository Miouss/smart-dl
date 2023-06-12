import { contextBridge, ipcRenderer } from "electron";
import FiringEvent from "./events/FiringEvent";
import CatchingEvent from "./events/CatchingEvent";
import CatchingOnceEvent from "./events/CatchingOnceEvent";

import { EventCallback } from "../types/Event";

contextBridge.exposeInMainWorld("fileSystemAPI", {
  chooseSaveLocationDialog: twoWaysEvent("choose-save-location-dialog"),
  getSaveLocation: twoWaysEvent("get-save-location"),
  getSavedCredentials: twoWaysEvent("get-saved-credentials"),
});

contextBridge.exposeInMainWorld("mediaAPI", {
  sendCancelButtonClicked: createFiringEvent("cancel-button-clicked"),
  sendCleanUpListenersDone: createFiringEvent("clean-up-listeners-done"),

  onCancel: createCatchingOnceEvent("cancel"),

  onDownloadFully: createCatchingOnceEvent("download-fully"),

  onRecoveringFragsPlaylists: createCatchingOnceEvent(
    "recovering-frags-playlists"
  ),

  onDownloadingFrags: createCatchingOnceEvent("downloading-frags"),

  onDownloadingVideoFrags: createCatchingOnceEvent("downloading-video-frags"),

  onDownloadingAudioFrags: createCatchingOnceEvent("downloading-audio-frags"),

  onUpdateVideoFragsSteps: createCatchingEvent("update-video-frags-steps"),

  onUpdateAudioFragsSteps: createCatchingEvent("update-audio-frags-steps"),

  onMerging: createCatchingOnceEvent("merging"),

  onMergingVideo: createCatchingOnceEvent("merging-video"),

  onMergingAudio: createCatchingOnceEvent("merging-audio"),

  onMergingParts: createCatchingOnceEvent("merging-parts"),

  onDeletingFrags: createCatchingOnceEvent("deleting-frags"),

  onDeletingParts: createCatchingOnceEvent("deleting-parts"),

  onDeletingSource: createCatchingOnceEvent("deleting-source"),
});

function createCatchingEvent(eventName: string) {
  return createEvent(new CatchingEvent(eventName));
}

function createFiringEvent(eventName: string) {
  return createEvent(new FiringEvent(eventName));
}

function createCatchingOnceEvent(eventName: string) {
  return {
    starts: createEvent(new CatchingOnceEvent(`${eventName}-starts`)),
    ends: createEvent(new CatchingOnceEvent(`${eventName}-ends`)),
  };
}

function createEvent(event: CatchingEvent | CatchingOnceEvent | FiringEvent) {
  return {
    ...(event instanceof FiringEvent
      ? {
          fire: () => event.fire(),
        }
      : {
          do: (callback: EventCallback) => {
            event.listener(callback);
          },
        }),
    removeAllListeners: () => event.removeAllListeners(),
  };
}

function twoWaysEvent(eventName: string) {
  return () => ipcRenderer.invoke(eventName);
}
