import downloadVodPlaylist from "./DownloadVodPlaylist";
import fsPromises from "fs/promises";

import fetch from "cross-fetch";

jest.mock("cross-fetch");

const fetchMock = fetch as jest.Mock;

describe("downloadVodPlaylist", () => {
  it("should fetch all video fragments' url", async () => {
    const videoPlaylist = await fsPromises.readFile(
      "./src/api/src/testData/downloadVodPlaylist/listVideo.m3u8",
      { encoding: "utf8" }
    );
    console.log(videoPlaylist);

    fetchMock.mockReturnValue({
      text: () => videoPlaylist,
    });

    const videoUrlList = await downloadVodPlaylist(
      "./src/api/src/testData/index.m3u8"
    );

    
    const correctVideoUrlList = [];

    for (let i = 1; i < 38; i++) {
        correctVideoUrlList.push(`./src/api/src/testData/${i}.ts`);
    }

    expect(videoUrlList).toMatchObject(correctVideoUrlList);
  });

  it("should fetch all audios fragments' url", async () => {
    const playlist = await fsPromises.readFile(
      "./src/api/src/testData/downloadVodPlaylist/listAudio.m3u8",
      { encoding: "utf8" }
    );

    fetchMock.mockReturnValue({
      text: () => playlist,
    });

    const audioUrlList = await downloadVodPlaylist(
      "./src/api/src/testData/index.m3u8"
    );

    const correctAudioUrlList = [];

    for (let i = 1; i < 38; i++) {
        correctAudioUrlList.push(`./src/api/src/testData/${i}.aac`);
    }

    expect(audioUrlList).toMatchObject(correctAudioUrlList);
  });
});
