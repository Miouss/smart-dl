import fetch from "cross-fetch";
import Listr from "listr";
import { createWriteStream } from "fs";

type MediaExtension = "ts" | "aac";

export default async function downloadVodFragments(
  urlList: Array<string>,
  extension: MediaExtension,
  outputPath: string
) {
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
                console.log(request);
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
