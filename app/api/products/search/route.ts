import { NextResponse } from "next/server";
import { searchAmazon } from "@/src/lib/platforms/amazon";
import { searchRicardo } from "@/src/lib/platforms/ricardo";
import { processQuery } from "@/src/lib/nlp";
import { ProductResult } from "@/types/products";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Invalid query parameter" },
        { status: 400 },
      );
    }

    // Process query with NLP
    const { category, attributes } = await processQuery(query);

    // Search platforms in parallel
    const [amazonResults, ricardoResults] = await Promise.all([
      searchAmazon(category, attributes),
      searchRicardo(category, attributes),
    ]);

    // Combine and sort results
    const results = [...amazonResults, ...ricardoResults].sort(
      (a, b) => a.price - b.price,
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 },
    );
  }
}
