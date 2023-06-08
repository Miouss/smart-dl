type Progress = "success" | "start";

export default function logProgress(message: string, progress: Progress, tabulation = true) {
  const tabChar = tabulation ? "  " : "";

  console.log(`${tabChar}[${progress.toUpperCase()}] ${message}`);
}