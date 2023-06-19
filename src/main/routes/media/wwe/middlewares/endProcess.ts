import fireEvent from "../../../../../../electron";
import { Response } from "express";

export function endProcess(_: any, res: Response) {
  fireEvent("download-fully-ends");
  
  console.timeEnd("Operations Completed in ");

  res.status(200);
  res.json({ Download: true });
}
