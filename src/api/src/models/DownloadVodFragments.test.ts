import startServer from "../../../server";
import window from "../../../index";
import fetch from "cross-fetch";
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

    await compareStreams(videoUrlList);
  });

  it("should download vod's audio fragments", async () => {
    const audioUrlList = [];

    for (let i = 0; i < 38; i++) {
      audioUrlList.push(`http://localhost:8000/testData/downloadVodPlaylist/${i}.aac`);
    }

    await downloadVodFragments(audioUrlList, "aac", outputPath);

    await compareStreams(audioUrlList);
  });
});


async function compareStreams(urlList: Array<string>){
  await Promise.all(urlList.map(async (url: string) => {
    const response = await fetch(url);
    const response2 = await fetch(url.replace("downloadVodPlaylist/", "downloadVodPlaylist/testOutput/"));
    
    const responseBuffer = await response.arrayBuffer();
    const response2Buffer = await response2.arrayBuffer();

    expect(responseBuffer).toEqual(response2Buffer);
  }))
}