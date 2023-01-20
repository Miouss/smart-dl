import getAuthToken from "./getAuthToken";
import fetch from "cross-fetch";

jest.mock("cross-fetch", () => ({
  __esModule: true,
  ...jest.requireActual("cross-fetch"),
  default: jest.fn(),
}));

const fetchMock = fetch as jest.Mock;

const requestedUrl = "https://dce-frontoffice.imggaming.com/api/v2/login";
const badUsername = "xd";
const badPassword = "xd";
const realm = "dce.wwe";
const apikey = "cca51ea0-7837-40df-a055-75eb6347b2e7";

describe("getAuthToken", () => {
  describe("it should throw an error when", () => {
    it("Credentials are incorrect", async() => {
      fetchMock.mockReturnValue({
        ok: false,
      });

      await expect(() =>
      getAuthToken(badUsername, badPassword, realm, apikey)
      ).rejects.toThrow("Credentials incorrect");
    });
  });

  it("should return the authorization bearer token", async () => {
    fetchMock.mockReturnValue({
      ok: true,
      json: () => ({
        authorisationToken: "token",
      }),
    });

    const result = await getAuthToken(
      badUsername,
      badPassword,
      realm,
      apikey
    );

    expect(result).toBe("token");
    expect(fetchMock).toHaveBeenCalledWith(requestedUrl, expect.any(Object));
  });
});
