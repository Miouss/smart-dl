import { ipcMain } from "electron";
import execa from "execa";

export default async function merging(command: string, option: Array<string>) {
  const mergingProcess = execa(command, option, {
    cwd: "./src/api/processing/",
    shell: true,
  });

  ipcMain.on("cancel-button-pressed", () => {
    if (mergingProcess) {
      mergingProcess.kill();
    }
  });

  await mergingProcess;
}
