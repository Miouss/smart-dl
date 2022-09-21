import startServer from "../../../server";
import { monitorPublicFolder } from "../../../express";
import downloadVodFragments from "./DownloadVodFragments";

const outputPath =
  "./public/testData/downloadVodPlaylist/testOuput";

let server: any = undefined;

beforeAll(() => {
  server = startServer();
  monitorPublicFolder();
});

afterAll(() => {
  server.close();
});

describe("downloadVodFragments", () => {
  it("should download vod's video fragments", async () => {
    const videoUrlList = [];

    for (let i = 0; i < 38; i++) {
      videoUrlList.push(`http://localhost:8000/testData/downloadVodPlaylist/${i}.ts`);
    }

    await downloadVodFragments(videoUrlList, "ts", outputPath);
  });
});
