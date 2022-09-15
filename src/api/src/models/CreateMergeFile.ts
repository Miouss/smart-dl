import { truncate, promises } from "fs";

type MediaExtension = "ts" | "aac";

export default async function createMergeFile(
  fileName: string,
  urlList: Array<string>,
  outputPath: string,
  extension: MediaExtension
) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  truncate(`./src/api/processing/${fileName}.txt`, 0, () => {});

  for (let i = 0; i < urlList.length; i++) {
    await promises.writeFile(
      `./src//api/processing/${fileName}.txt`,
      `file '${outputPath}\\${i}.${extension}'\n`,
      { flag: "a" }
    );
  }
}
