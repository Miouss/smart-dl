import getVodPlaylist from "./GetVodPlaylistUrl";
import fetch from "cross-fetch";

jest.mock("cross-fetch");

const fetchMock = fetch as jest.Mock;
const vodId = "0000";

describe("getVodPlaylist", () => {
  describe("it should throw an error when", () => {
    it("vod id is wrong", async () => {
      fetchMock.mockReturnValue({ ok: false });

      await expect(() =>
        getVodPlaylist(
          "valid bearer token",
          vodId,
          "valid realm",
          "valid apikey"
        )
      ).rejects.toThrow(
        `Request to retrieve url playlists  of vod id ${vodId} failed`
      );
    });

    it("vod id is correct but playlist url is wrong", async () => {
      fetchMock
        .mockReturnValueOnce({
          ok: true,
          json: () => {
            return { playerUrlCallback: "valid url" };
          },
        })
        .mockReturnValueOnce({ ok: false });

      await expect(() =>
        getVodPlaylist(
          "valid bearer token",
          vodId,
          "valid realm",
          "valid apikey"
        )
      ).rejects.toThrow(`Can't access list of available m3u8 playlist`);
    });
  });

  it("should return correct playlist url", async () => {
    fetchMock
      .mockReturnValueOnce({
        ok: true,
        json: () => {
          return {
            playerUrlCallback: "valid playerUrlCallBack",
          };
        },
      })
      .mockReturnValueOnce({
        ok: true,
        json: () => {
          return {
            hls: [
              // LAST ITEM
              {
                url: "https://any-prefix/master.m3u8",
              },
            ],
          };
        },
      });

    const result = await getVodPlaylist(
      "valid bearer token",
      vodId,
      "valid realm",
      "valid apikey"
    );

    expect(result).toMatchObject({
      url: "https://any-prefix/master.m3u8",
      prefix: "https://any-prefix/",
    });
  });
});
