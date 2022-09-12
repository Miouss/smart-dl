import getVodId from "./GetVodId";
import fetch from "cross-fetch";

jest.mock("cross-fetch");

const fetchMock = fetch as jest.Mock;

describe("getVodId", () => {
  describe("it should throw an error when", () => {
    it("link provided is incorrect", async () => {
        fetchMock.mockReturnValue({
            ok: false,
        });

      await expect(() =>
        getVodId("bad link")
      ).rejects.toThrow("Can't retrieve data");
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
              customFields: {
                DiceVideoId: "VOD Id",
              },
            },
          },
        ],
      }),
    });
    const metadata = await getVodId("any");

    expect(metadata).toMatchObject({
      vodId: "VOD Id",
      vodName: "VOD Title",
    });
  });
});
