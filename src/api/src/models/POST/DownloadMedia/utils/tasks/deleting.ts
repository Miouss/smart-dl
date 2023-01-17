import getWindow from "../../../../../../../index";
import { promises } from "fs";

export async function deleteFragsFiles(outputPath: string) {
  const file = await promises.open("src/api/processing/number.txt");
  const fileHandleData = await file.readFile({ encoding: "utf8" });
  await file.close();

  for (let i = 0; i < parseInt(fileHandleData); i++) {
    await deleteFiles(`${outputPath}/${i}.ts`, "frags");
    await deleteFiles(`${outputPath}/${i}.aac`, "frags");
  }
}

export async function deletePartsFiles(outputPath: string) {
  await deleteFiles(`${outputPath}/output.ts`, "parts");
  await deleteFiles(`${outputPath}/output.aac`, "parts");
}

export async function deleteFullFile(outputPath: string, vodTitle: string) {
  await deleteFiles(`${outputPath}/${vodTitle}.mp4`, "source");
}

async function deleteFiles(filePath: string, event: string) {
  const windowWebContents = getWindow().webContents;

  windowWebContents.send(`deleting-${event}-starts`);

  const fileHandle = await promises.open(filePath, "w");

  await fileHandle.close();
  await promises.unlink(filePath);
  windowWebContents.send(`deleting-${event}-ends`);
}
