export interface INotificationAPI {
  sendNotification: () => void;
}

export interface IFileSystemAPI {
  openFileSystemDialog: () => void;
}

declare global {
  interface Window {
    notificationAPI: INotificationAPI;
    fileSystemAPI: IFileSystemAPI;
  }
}