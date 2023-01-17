import downloadVodFragments from "./DownloadVodFragments";

import fetch from "cross-fetch";
import appExpress, {startServer, stopServer, monitorPublicFolder} from "../../../../../express";

const outputPath = "./public/testData/downloadVodPlaylist/testOuput";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any = undefined;

beforeAll(() => {
  server = startServer(appExpress);
  monitorPublicFolder();
});

afterAll(() => {
  stopServer(server);
});

const index = 0;
const simultaneousDL = 10;

describe("downloadVodFragments", () => {
  it("should download vod's video fragments", async () => {
    const videoUrlList = [];

    for (let i = 0; i < 38; i++) {
      videoUrlList.push(
        `http://localhost:8000/testData/downloadVodPlaylist/${i}.ts`
      );
    }

    await downloadVodFragments(
      videoUrlList,
      "ts",
      outputPath,
      index,
      simultaneousDL
    );

    await compareStreams(videoUrlList);
  });

  it("should download vod's audio fragments", async () => {
    const audioUrlList = [];

    for (let i = 0; i < 38; i++) {
      audioUrlList.push(
        `http://localhost:8000/testData/downloadVodPlaylist/${i}.aac`
      );
    }

    await downloadVodFragments(
      audioUrlList,
      "aac",
      outputPath,
      index,
      simultaneousDL
    );

    await compareStreams(audioUrlList);
  });
});

async function compareStreams(urlList: Array<string>) {
  await Promise.all(
    urlList.map(async (url: string) => {
      const response = await fetch(url);
      const response2 = await fetch(
        url.replace("downloadVodPlaylist/", "downloadVodPlaylist/testOutput/")
      );

      const responseBuffer = await response.arrayBuffer();
      const response2Buffer = await response2.arrayBuffer();

      expect(responseBuffer).toEqual(response2Buffer);
    })
  );
}