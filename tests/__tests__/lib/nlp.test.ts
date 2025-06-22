import { processQuery } from "@/src/lib/nlp";

describe("NLP Processing", () => {
  beforeEach(() => {
    // Mock OpenAI API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    category: "electronics/computers",
                    attributes: {
                      type: "laptop",
                      minRam: "8GB",
                      minStorage: "256GB",
                    },
                  }),
                },
              },
            ],
          }),
      }),
    ) as jest.Mock;
  });

  it("processes one-word query correctly", async () => {
    const result = await processQuery("laptop");
    expect(result).toEqual({
      category: "electronics/computers",
      attributes: {
        type: "laptop",
        minRam: "8GB",
        minStorage: "256GB",
      },
    });
  });

  it("handles API errors gracefully", async () => {
    global.fetch = jest.fn(() => Promise.reject("API Error")) as jest.Mock;
    const result = await processQuery("laptop");
    expect(result).toEqual({
      category: "general",
      attributes: { query: "laptop" },
    });
  });

  it("handles invalid API responses", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            choices: [
              {
                message: {
                  content: "invalid json",
                },
              },
            ],
          }),
      }),
    ) as jest.Mock;
    const result = await processQuery("laptop");
    expect(result).toEqual({
      category: "general",
      attributes: { query: "laptop" },
    });
  });
});
