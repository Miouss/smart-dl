import fireEvent from "../../../../../../../index";
import { promises } from "fs";

export async function deleteFrags(outputPath: string) {
  const file = await promises.open("src/api/processing/number.txt");
  const fileHandleData = await file.readFile({ encoding: "utf8" });
  await file.close();

  fireEvent("deleting-frags-starts");

  const nbFiles = Array(parseInt(fileHandleData)).fill(0);

  await Promise.allSettled(
    nbFiles.map(async (_, i) => {
      await deleteFiles(`${outputPath}/${i}.ts`);
      await deleteFiles(`${outputPath}/${i}.aac`);
    })
  );

  fireEvent("deleting-frags-ends");
}

export async function deleteParts(outputPath: string) {
  fireEvent("deleting-parts-starts");
  const deletePromises = [
    deleteFiles(`${outputPath}/output.ts`),
    deleteFiles(`${outputPath}/output.aac`),
  ];

  await Promise.allSettled(deletePromises.map(async (promise) => await promise));

  fireEvent("deleting-parts-ends");
}

export async function deleteSource(outputPath: string, vodTitle: string) {
  fireEvent("deleting-source-starts");
  await deleteFiles(`${outputPath}/${vodTitle}.mp4`);
  fireEvent("deleting-source-ends");
}

async function deleteFiles(filePath: string) {
  try {
    const file = await promises.open(filePath, "w");
    promises.unlink(filePath);
    file.close();
  } catch (err) {
    console.log(err);
  }
}
