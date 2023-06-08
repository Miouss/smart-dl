import { Response, NextFunction } from "express";
import fireEvent from "../../../../Electron";
import cancelDownloadedFiles from "../utils/cancelDownloadedFiles";

export async function errorHandler(
  err: any,
  req: any,
  res: Response,
  _: NextFunction
) {
  console.log(`[ERROR] : \n ${err.message}`);

  if (err.message === "cancel") {
    console.log("Cancel [starts]");
    fireEvent("cancel-starts");

    try {
      const { saveLocation } = req;
      const { vodTitle } = req.body;

      await cancelDownloadedFiles(saveLocation, vodTitle);
    } catch (err) {
      console.log(err);
    }

    fireEvent("cancel-ends");
    console.log("Cancel [completed]");

    res.status(200);
    res.json({ Download: false });
  } else {
    res.status(500);
    res.json({ errorMessage: err });
  }
}
