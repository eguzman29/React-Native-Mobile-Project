import { getMusicData } from "../../api-client";

global.fetch = jest.fn();

describe("API Client - getMusicData", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call fetch with the correct URL", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({
        topartists: { artist: [] }
      })
    });

    await getMusicData();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=fe2cc92248cc7c40fe2ac2aa940649b2&format=json`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
  });

  it("should transform API response into artist list", async () => {
    const mockApiResponse = {
      topartists: {
        artist: [
          {
            mbid: "123",
            name: "Artist 1",
            image: [
              { "#text": "url_image" }
            ]
          }
        ]
      }
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockApiResponse)
    });

    const result = await getMusicData();

    expect(result).toEqual([
      {
        id: "123",
        name: "Artist 1",
        image: "url_image"
      }
    ]);
  });

});