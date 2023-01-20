import getAuthToken from "./getVodDetails";
import fetch from "cross-fetch";

jest.mock("cross-fetch");

const fetchMock = fetch as jest.Mock;

describe("getAuthToken", () => {
  describe("it should throw an error when", () => {
    it("link provided is incorrect", async () => {
      fetchMock.mockReturnValue({
        ok: false,
      });

      await expect(() => getAuthToken("bad link")).rejects.toThrow(
        "Can't retrieve data"
      );
    });
  });

  it("should return correct metadata", async () => {
    fetchMock.mockReturnValue({
      ok: true,

      json: () => ({
        title: "VOD Title",
        entries: [
          {
            item: {
              images: {
                wallpaper: "VOD Thumbnail",
              },
              shortDescription: "VOD Description",
              customFields: {
                DiceVideoId: "VOD Id",
              },
            },
          },
        ],
      }),
    });
    const metadata = await getAuthToken("any");

    expect(metadata).toMatchObject({
      vodId: "VOD Id",
      title: "VOD Title",
      thumbnail: "VOD Thumbnail",
      description: "VOD Description",
    });
  });
});
