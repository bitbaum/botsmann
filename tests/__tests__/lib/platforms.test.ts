import { searchAmazon } from "@/src/lib/platforms/amazon";
import { searchRicardo } from "@/src/lib/platforms/ricardo";

describe("Platform Integrations", () => {
  describe("Amazon Integration", () => {
    it("returns products for valid search", async () => {
      const results = await searchAmazon("electronics/computers", {
        type: "laptop",
        minRam: "8GB",
      });

      expect(results).toHaveLength(2);
      expect(results[0]).toHaveProperty("platform", "Amazon");
      expect(results[0]).toHaveProperty("price");
      expect(results[0]).toHaveProperty("title");
    });

    it("handles API errors gracefully", async () => {
      process.env.AMAZON_API_KEY = undefined;
      const results = await searchAmazon("electronics", {});
      expect(results).toEqual([]);
    });
  });

  describe("Ricardo Integration", () => {
    it("returns products for valid search", async () => {
      const results = await searchRicardo("electronics/computers", {
        type: "laptop",
        minRam: "8GB",
      });

      expect(results).toHaveLength(2);
      expect(results[0]).toHaveProperty("platform", "Ricardo");
      expect(results[0]).toHaveProperty("price");
      expect(results[0]).toHaveProperty("title");
    });

    it("handles API errors gracefully", async () => {
      process.env.RICARDO_API_KEY = undefined;
      const results = await searchRicardo("electronics", {});
      expect(results).toEqual([]);
    });
  });

  describe("Concurrent Search Performance", () => {
    it("handles multiple concurrent searches", async () => {
      const searches = Array(5)
        .fill(null)
        .map(() =>
          Promise.all([
            searchAmazon("electronics", {}),
            searchRicardo("electronics", {}),
          ]),
        );

      const results = await Promise.all(searches);
      results.forEach(([amazonResults, ricardoResults]) => {
        expect(amazonResults).toHaveLength(2);
        expect(ricardoResults).toHaveLength(2);
      });
    });
  });
});
