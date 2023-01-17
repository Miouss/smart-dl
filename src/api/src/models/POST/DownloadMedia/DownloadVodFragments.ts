import fetch from "cross-fetch";

import { createWriteStream } from "fs";

import getWindow from "../../../../../index";

type MediaExtension = "ts" | "aac";

export default async function downloadVodFragments(
  urlList: Array<string>,
  extension: MediaExtension,
  outputPath: string,
  i: number,
  simultaneousDL : number,
) {
  const mediaType = extension === "ts" ? "Video" : "Audio";

  const windowWebContents = getWindow().webContents;

  const iterableArrayLength =
  i + simultaneousDL < urlList.length
    ? simultaneousDL
    : urlList.length - i;

  async function startDownload() {
      const taskTitle = `Downloading ${urlList.length} ${mediaType} Fragments ${
        i + 1
      }-${i + iterableArrayLength}/${urlList.length}`;

      windowWebContents.send("update-download-steps", taskTitle, mediaType);

      await Promise.all(
        Array(iterableArrayLength)
          .fill(0)
          .map(async (value, j) => {
            const request = await fetch(urlList[i + j]);

            await new Promise<void>((resolve) => {
              const writeStream = createWriteStream(
                `${outputPath}\\${i + j}.${extension}`
              );

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              request.body.pipe(writeStream);

              writeStream.on("error", (err) => {
                console.log("Error : " + err);
              });

              writeStream.on("finish", () => {
                resolve();
              });
            });
          })
      );
    
  }

  await startDownload();

  return iterableArrayLength === simultaneousDL;
}
