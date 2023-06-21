import fireEvent from "../../../../../../electron";
import { promises } from "fs";
import { PROCESSING_FOLDER } from "../../../../../config";
import { MediaExtension } from "../../types";

export async function deleteFrags(saveLocation: string, ext: MediaExtension) {
  const file = await promises.open(`${PROCESSING_FOLDER}/number.txt`);
  const fileHandleData = await file.readFile({ encoding: "utf8" });
  await file.close();

  fireEvent("deleting-frags-starts");

  const nbFiles = Array(parseInt(fileHandleData)).fill(0);

  await Promise.allSettled(
    nbFiles.map(async (_, i) => {
      await deleteFiles(`${saveLocation}/${i}.${ext.video}`);
      await deleteFiles(`${saveLocation}/${i}.${ext.audio}`);
    })
  );

  fireEvent("deleting-frags-ends");
}

export async function deleteParts(saveLocation: string, ext: MediaExtension) {
  fireEvent("deleting-parts-starts");
  const deletePromises = [
    deleteFiles(`${saveLocation}/output.${ext.video}`),
    deleteFiles(`${saveLocation}/output.${ext.audio}`),
  ];

  await Promise.allSettled(
    deletePromises.map(async (promise) => await promise)
  );

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
