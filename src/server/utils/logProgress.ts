type Progress = "success" | "start";

const progressMessage = {
  process: "Collecting VOD's data",
  credentials: "Retrieving credentials",
  vodDetails: "Retrieving VOD details",
  vodPlaylist: "Retrieving VOD playlist url",
  auth: "Authentification",
  vodStreams: "Retrieving VOD streams",
};

type ProgressMessage = keyof typeof progressMessage;

export function startLogProgress(messageType: ProgressMessage, tabulation = true) {
  logProgress(progressMessage[messageType], "start", tabulation);
}

export function successLogProgress(
  messageType: ProgressMessage,
  tabulation = true
) {
  logProgress(progressMessage[messageType], "success", tabulation);
}

function logProgress(message: string, progress: Progress, tabulation = true) {
  const tabChar = tabulation ? "  " : "";

  console.log(`${tabChar}[${progress.toUpperCase()}] ${message}`);
}
