export interface INotificationAPI {
  sendNotification: () => void;
}

export interface IFileSystemAPI {
  openFileSystemDialog: () => void;
  retrieveOutputPath: () => void;
  onOutputPathAdded: (callback) => void;
  onOutputPathRetrieved: (callback) => void;
  retrieveAccount: () => void;
  onAccountRetrieved: (callback) => void;
}

export interface IDownloadAPI {
  sendCancelButtonPressed: () => void;

  onCancelStarts: (callback) => void;
  onCancelEnds: (callback) => void;

  onDownloadFullyStarts: (callback) => void;
  onDownloadFullyEnds: (callback) => void;

  onRecoveringFragsPlaylistsStarts: (callback) => void;
  onRecoveringFragsPlaylistsEnds: (callback) => void;

  onDownloadingFragsStarts: (callback) => void;
  onUpdateDownloadSteps: (callback) => void;
  onDownloadStepsEnds: (callback) => void;
  onDownloadingFragsEnds: (callback) => void;
  onMergingStarts: (callback) => void;
  
  onMergingVideoStarts: (callback) => void;
  onMergingVideoEnds: (callback) => void;
  onMergingAudioStarts: (callback) => void;
  onMergingAudioEnds: (callback) => void;
  onMergingPartsStarts: (callback) => void;
  onMergingPartsEnds: (callback) => void;
  onMergingEnds: (callback) => void;

  onDeletingFragsStarts: (callback) => void;
  onDeletingFragsEnds: (callback) => void;
  onDeletingPartsStarts: (callback) => void;
  onDeletingPartsEnds: (callback) => void;
  onDeletingSourceStarts: (callback) => void;
  onDeletingSourceEnds: (callback) => void;
  }

declare global {
  interface Window {
    notificationAPI: INotificationAPI;
    fileSystemAPI: IFileSystemAPI;
    downloadAPI: IDownloadAPI;
  }
}
