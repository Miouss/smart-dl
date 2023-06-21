import { ipcMain } from "electron";
import fireEvent from "../../../../../electron";
import { Response, NextFunction } from "express";

export function startProcess(req: any, __: Response, next: NextFunction) {
  console.time("Operations Completed in ");

  fireEvent("download-fully-starts");

  req.isCanceled = false;

  ipcMain.once("cancel-button-clicked", () => {
    req.isCanceled = true;
  });

  next();
}
