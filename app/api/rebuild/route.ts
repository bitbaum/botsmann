import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Revalidate the blog pages
    revalidatePath("/blog");

    return NextResponse.json({
      revalidated: true,
      now: new Date().toISOString(),
      message: "Blog content has been refreshed.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        message: "Error revalidating content",
        error: String(error),
      },
      { status: 500 },
    );
  }
}
