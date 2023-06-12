import {
  FiringEventInstance,
  CatchingEventInstance,
  CatchingOnceEventInstance,
} from "./types/Event";

export interface FileSystemAPI {
  chooseSaveLocationDialog: PromiseEvent;
  getSaveLocation: PromiseEvent;
  getSavedCredentials: PromiseEvent;
}

export interface MediaAPI {
  sendCancelButtonClicked: FiringEventInstance;
  sendCleanUpListenersDone: FiringEventInstance;

  sendCleanUpListeners: FiringEventInstance;

  onCancel: CatchingOnceEventInstance;

  onDownloadFully: CatchingOnceEventInstance;

  onDownloadingFrags: CatchingOnceEventInstance;
  onDownloadingVideoFrags: CatchingOnceEventInstance;
  onDownloadingAudioFrags: CatchingOnceEventInstance;

  onMerging: CatchingOnceEventInstance;
  onMergingVideo: CatchingOnceEventInstance;
  onMergingAudio: CatchingOnceEventInstance;
  onMergingParts: CatchingOnceEventInstance;

  onDeletingFrags: CatchingOnceEventInstance;
  onDeletingParts: CatchingOnceEventInstance;
  onDeletingSource: CatchingOnceEventInstance;

  onUpdateVideoFragsSteps: CatchingEventInstance;
  onUpdateAudioFragsSteps: CatchingEventInstance;
}

declare global {
  interface Window {
    fileSystemAPI: FileSystemAPI;
    mediaAPI: MediaAPI;
  }
}
