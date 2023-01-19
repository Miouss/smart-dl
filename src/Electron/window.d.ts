import {
  FiringEventInstance,
  CatchingEventInstance,
  CatchingOnceEventInstance,
} from "../types/Event";


export interface FileSystemAPI {
  chooseSaveLocationDialog: PromiseEvent;
  getSaveLocation: PromiseEvent;
  getSavedCredentials: PromiseEvent;
}

export interface MediaAPI {
  sendCancelButtonClicked: FiringEventInstance;
  sendCleanUpListenersDone: FiringEventInstance;

  sendCleanUpListeners: FiringEventInstance;

  onCancelStarts: CatchingOnceEventInstance;
  onCancelEnds: CatchingOnceEventInstance;

  onDownloadFullyStarts: CatchingOnceEventInstance;
  onDownloadFullyEnds: CatchingOnceEventInstance;

  onDownloadingFragsStarts: CatchingOnceEventInstance;
  onDownloadingVideoFragsStarts: CatchingOnceEventInstance;
  onDownloadingAudioFragsStarts: CatchingOnceEventInstance;

  onUpdateVideoFragsSteps: CatchingEventInstance;
  onUpdateAudioFragsSteps: CatchingEventInstance;

  onDownloadingVideoFragsEnds: CatchingOnceEventInstance;
  onDownloadingAudioFragsEnds: CatchingOnceEventInstance;
  onDownloadingFragsEnds: CatchingOnceEventInstance;

  onMergingStarts: CatchingOnceEventInstance;
  onMergingVideoStarts: CatchingOnceEventInstance;
  onMergingVideoEnds: CatchingOnceEventInstance;
  onMergingAudioStarts: CatchingOnceEventInstance;
  onMergingAudioEnds: CatchingOnceEventInstance;
  onMergingPartsStarts: CatchingOnceEventInstance;
  onMergingPartsEnds: CatchingOnceEventInstance;
  onMergingEnds: CatchingOnceEventInstance;

  onDeletingFragsStarts: CatchingOnceEventInstance;
  onDeletingFragsEnds: CatchingOnceEventInstance;
  onDeletingPartsStarts: CatchingOnceEventInstance;
  onDeletingPartsEnds: CatchingOnceEventInstance;
  onDeletingSourceStarts: CatchingOnceEventInstance;
  onDeletingSourceEnds: CatchingOnceEventInstance;
}

declare global {
  interface Window {
    fileSystemAPI: FileSystemAPI;
    mediaAPI: MediaAPI;
  }
}