import fireEvent from "../../../../../Electron/index";
import { promises } from "fs";
import { PROCESSING_FOLDER } from "../../../../../config";

export async function deleteFrags(saveLocation: string) {
  const file = await promises.open(`${PROCESSING_FOLDER}/number.txt`);
  const fileHandleData = await file.readFile({ encoding: "utf8" });
  await file.close();

  fireEvent("deleting-frags-starts");

  const nbFiles = Array(parseInt(fileHandleData)).fill(0);

  await Promise.allSettled(
    nbFiles.map(async (_, i) => {
      await deleteFiles(`${saveLocation}/${i}.ts`);
      await deleteFiles(`${saveLocation}/${i}.aac`);
    })
  );

  fireEvent("deleting-frags-ends");
}

export async function deleteParts(saveLocation: string) {
  fireEvent("deleting-parts-starts");
  const deletePromises = [
    deleteFiles(`${saveLocation}/output.ts`),
    deleteFiles(`${saveLocation}/output.aac`),
  ];

  await Promise.allSettled(deletePromises.map(async (promise) => await promise));

  fireEvent("deleting-parts-ends");
}

export async function deleteSource(saveLocation: string, vodTitle: string) {
  fireEvent("deleting-source-starts");
  await deleteFiles(`${saveLocation}/${vodTitle}.mp4`);
  fireEvent("deleting-source-ends");
}

async function deleteFiles(filePath: string) {
  try {
    const file = await promises.open(filePath, "w");
    await file.close();
    await promises.unlink(filePath);
  } catch (err) {
    console.log(`Error deleting file at ${filePath} : ${err}`);
  }
}
