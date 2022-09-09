import fetch from "cross-fetch";
import { Parser } from "m3u8-parser";
import { truncate, promises, createWriteStream } from "fs";
import Listr from "listr";

type MediaExtension = "ts" | "aac";

export default async function downloadVodPlaylist(
  fileName: string,
  playlist: string,
  extension: MediaExtension,
  outputPath : string
) {
  const request = await fetch(playlist);
  const data = await request.text();

  const parser = new Parser();
  parser.push(data);
  parser.end();

  const urlList: Array<string> = [];

  parser.manifest.segments.forEach((element: any) => {
    urlList.push(playlist.split("index")[0] + element.uri);
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  truncate(`./src/api/processing/${fileName}.txt`, 0, () => {});

  for (let i = 0; i < urlList.length; i++) {
    await promises.writeFile(
      `./src//api/processing/${fileName}.txt`,
      `file '${outputPath}\\${i}.${extension}'\n`,
      { flag: "a" }
    );
  }

  await downloadVod(urlList, extension, outputPath);
}

async function downloadVod(urlList: Array<string>, extension: MediaExtension, outputPath: string) {
  const mediaType = extension === "ts" ? "Video" : "Audio";

  const testList = new Listr([
    {
      title: `Downloading ${urlList.length} ${mediaType} Fragments`,
      task: async (ctx, task) => {
        const simultaneousDL = 10;
        for (let i = 0; i < urlList.length; i += simultaneousDL) {
          const iterableArrayLength =
            i + simultaneousDL < urlList.length
              ? simultaneousDL
              : urlList.length - i;

          task.title = `Downloading ${urlList.length} ${mediaType} Fragments ${
            i + 1
          }-${i + iterableArrayLength}/${urlList.length}`;

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
      },
    },
  ]);

  await testList.run();
}
