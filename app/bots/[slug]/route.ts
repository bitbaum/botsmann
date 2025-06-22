import { type NextRequest } from "next/server";
import bots from "@/data/bots";

export async function generateStaticParams() {
  return bots.map((bot) => ({
    slug: bot.slug,
  }));
}

export const dynamic = "force-static";
