import GetVodStreams from "./GetVodStreams";
import fetch from "cross-fetch";
import fsPromises from "fs/promises";

jest.mock("cross-fetch");

const fetchMock = fetch as jest.Mock;

describe("GetVodStreams", () => {
  describe("it should throw an error when", () => {
    it("fetching vodPlaylist.url fails", async() => {
      fetchMock.mockReturnValue({
        ok: false,
      });

      await expect(() => GetVodStreams({
        url: "invalid url",
        prefix: "invalid prefix",
      })).rejects.toThrowError("Can't get playlist url");
    });
  });

  it("should return the correct media selection structure", async () => {
    const vodPlaylistUrlData = await fsPromises.readFile(
      "src/api/src/testData/vodPlaylistUrl.txt",
      { encoding: "utf8" }
    );

    fetchMock.mockReturnValue({
      ok: true,
      text: () => vodPlaylistUrlData,
    });

    const result = await GetVodStreams({
      url: "valid url",
      prefix: "valid prefix",
    });

    expect(result).toMatchObject({
      AudioSelection: {
        "audio-2": {
          "français (France)": expect.any(Object),
          English: expect.any(Object),
        },
        "audio-1": {
          "français (France)": expect.any(Object),
          English: expect.any(Object),
        },
        "audio-3": {
          "Bahasa Indonesia (Indonesia)": expect.any(Object),
          English: expect.any(Object),
          "français (France)": expect.any(Object),
        },
      },
      VideoSelection: [
        {
          resolution: "1280x720",
          "Average-Bandwidth": "35932",
          audio: "audio-2",
          url: "video/f738d428-a759-4d20-951c-bf43355e5fe3/index.m3u8?hdntl=exp=1663254266~acl=%2f*~id=4a6da48f-b593-40c4-a1d6-fa59bdfb7498~data=hdntl~hmac=021952477a003205c1190351671281d22e86252aef0dec88a9a1df9c2ff2bffc",
        },
        {
          resolution: "1920x1080",
          "Average-Bandwidth": "81781",
          audio: "audio-3",
          url: "video/7f9023d7-806d-4f4d-b48c-90b7d9829b1d/index.m3u8?hdntl=exp=1663254266~acl=%2f*~id=4a6da48f-b593-40c4-a1d6-fa59bdfb7498~data=hdntl~hmac=021952477a003205c1190351671281d22e86252aef0dec88a9a1df9c2ff2bffc",
        },
        {
          resolution: "1920x1080",
          "Average-Bandwidth": "51279",
          audio: "audio-2",
          url: "video/20a9f49e-42ea-4f08-8ef4-45abe648e930/index.m3u8?hdntl=exp=1663254266~acl=%2f*~id=4a6da48f-b593-40c4-a1d6-fa59bdfb7498~data=hdntl~hmac=021952477a003205c1190351671281d22e86252aef0dec88a9a1df9c2ff2bffc",
        },
        {
          resolution: "1280x720",
          "Average-Bandwidth": "17020",
          audio: "audio-2",
          url: "video/35fecf5e-0499-4fdd-941e-4bcb79970542/index.m3u8?hdntl=exp=1663254266~acl=%2f*~id=4a6da48f-b593-40c4-a1d6-fa59bdfb7498~data=hdntl~hmac=021952477a003205c1190351671281d22e86252aef0dec88a9a1df9c2ff2bffc",
        },
        {
          resolution: "896x504",
          "Average-Bandwidth": "11522",
          audio: "audio-2",
          url: "video/23f5dd83-f66f-46c8-a9b2-00231acefdba/index.m3u8?hdntl=exp=1663254266~acl=%2f*~id=4a6da48f-b593-40c4-a1d6-fa59bdfb7498~data=hdntl~hmac=021952477a003205c1190351671281d22e86252aef0dec88a9a1df9c2ff2bffc",
        },
        {
          resolution: "640x360",
          "Average-Bandwidth": "7736",
          audio: "audio-2",
          url: "video/c9dd088a-30c9-488f-9800-89a63dfa2525/index.m3u8?hdntl=exp=1663254266~acl=%2f*~id=4a6da48f-b593-40c4-a1d6-fa59bdfb7498~data=hdntl~hmac=021952477a003205c1190351671281d22e86252aef0dec88a9a1df9c2ff2bffc",
        },
        {
          resolution: "512x288",
          "Average-Bandwidth": "4527",
          audio: "audio-1",
          url: "video/c0486172-3be3-4a28-9a7c-95af83a47745/index.m3u8?hdntl=exp=1663254266~acl=%2f*~id=4a6da48f-b593-40c4-a1d6-fa59bdfb7498~data=hdntl~hmac=021952477a003205c1190351671281d22e86252aef0dec88a9a1df9c2ff2bffc",
        },
      ],
      prefix: "valid prefix",
    });
  });
});
