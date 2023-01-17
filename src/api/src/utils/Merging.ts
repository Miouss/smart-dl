import getWindow from "../../../index";
import { promises } from "fs";
import { FileHandle } from "fs/promises";

export async function deleteFragsFiles(outputPath: string) {
  const fileHandle = await promises.open("src/api/processing/number.txt");

  const fileHandleData = await fileHandle.readFile({ encoding: "utf8" });

  await fileHandle.close();

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

  let fileHandle: FileHandle | undefined;

  try {
    windowWebContents.send(`deleting-${event}-starts`);

    fileHandle = await promises.open(filePath, "w");
    await promises.unlink(filePath);
  } catch (err) {
    console.log(err);
  } finally {
    await fileHandle?.close();
    
    windowWebContents.send(`deleting-${event}-ends`);
  }
}
