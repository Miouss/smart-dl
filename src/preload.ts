/* eslint-disable @typescript-eslint/no-explicit-any */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import FiringEvent from "./api/events/FiringEvent";
import CatchingEvent from "./api/events/CatchingEvent";
import CatchingOnceEvent from "./api/events/CatchingOnceEvent";

import { EventCallback } from "./types/Event";

contextBridge.exposeInMainWorld("fileSystemAPI", {
  chooseSaveLocationDialog: twoWaysEvent("choose-save-location-dialog"),
  getSaveLocation: twoWaysEvent("get-save-location"),
  getSavedCredentials: twoWaysEvent("get-saved-credentials"),
});

contextBridge.exposeInMainWorld("mediaAPI", {
  sendCancelButtonClicked: createEvent(new FiringEvent("cancel-button-clicked")),
  sendCleanUpListenersDone: createEvent(new FiringEvent("clean-up-listeners-done")),

  onCancelStarts: createEvent(new CatchingOnceEvent("cancel-starts")),
  onCancelEnds: createEvent(new CatchingOnceEvent("cancel-ends")),

  onDownloadFullyStarts: createEvent(new CatchingOnceEvent("download-fully-starts")),
  onDownloadFullyEnds: createEvent(new CatchingOnceEvent("download-fully-ends")),

  onRecoveringFragsPlaylistsStarts: createEvent(new CatchingOnceEvent(
    "recovering-frags-playlists-starts"
  )),
  onRecoveringFragsPlaylistsEnds: createEvent(new CatchingOnceEvent(
    "recovering-frags-playlists-ends"
  )),

  onDownloadingFragsStarts: createEvent(new CatchingOnceEvent("downloading-frags-starts")),
  onDownloadingFragsEnds: createEvent(new CatchingOnceEvent("downloading-frags-ends")),

  onDownloadingVideoFragsStarts: createEvent(new CatchingOnceEvent(
    "downloading-video-frags-starts"
  )),
  onDownloadingVideoFragsEnds: createEvent(new CatchingOnceEvent(
    "downloading-video-frags-ends"
  )),

  onDownloadingAudioFragsStarts: createEvent(new CatchingOnceEvent(
    "downloading-audio-frags-starts"
  )),
  onDownloadingAudioFragsEnds: createEvent(new CatchingOnceEvent(
    "downloading-audio-frags-ends"
  )),

  onUpdateVideoFragsSteps: createEvent(new CatchingEvent("update-video-frags-steps")),
  onUpdateAudioFragsSteps: createEvent(new CatchingEvent("update-audio-frags-steps")),

  onMergingStarts: createEvent(new CatchingOnceEvent("merging-starts")),
  onMergingEnds: createEvent(new CatchingOnceEvent("merging-ends")),

  onMergingVideoStarts: createEvent(new CatchingOnceEvent("merging-video-starts")),
  onMergingVideoEnds: createEvent(new CatchingOnceEvent("merging-video-ends")),

  onMergingAudioStarts: createEvent(new CatchingOnceEvent("merging-audio-starts")),
  onMergingAudioEnds: createEvent(new CatchingOnceEvent("merging-audio-ends")),

  onMergingPartsStarts: createEvent(new CatchingOnceEvent("merging-parts-starts")),
  onMergingPartsEnds: createEvent(new CatchingOnceEvent("merging-parts-ends")),

  onDeletingFragsStarts: createEvent(new CatchingOnceEvent("deleting-frags-starts")),
  onDeletingFragsEnds: createEvent(new CatchingOnceEvent("deleting-frags-ends")),

  onDeletingPartsStarts: createEvent(new CatchingOnceEvent("deleting-parts-starts")),
  onDeletingPartsEnds: createEvent(new CatchingOnceEvent("deleting-parts-ends")),

  onDeletingSourceEnds: createEvent(new CatchingOnceEvent("deleting-source-ends")),
  onDeletingSourceStarts: createEvent(new CatchingOnceEvent("deleting-source-starts")),
});

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