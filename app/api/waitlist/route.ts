import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface WaitlistEntry {
  email: string;
  preferences: {
    events: boolean;
    newsletters: boolean;
    blog: boolean;
    videos: boolean;
  };
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, preferences } = data;

    // Validate email
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Create entry
    const waitlistEntry: WaitlistEntry = {
      email,
      preferences: {
        events: Boolean(preferences?.events),
        newsletters: Boolean(preferences?.newsletters),
        blog: Boolean(preferences?.blog),
        videos: Boolean(preferences?.videos),
      },
      timestamp: new Date().toISOString(),
    };

    // In a production environment, you would typically:
    // 1. Store this in a database
    // 2. Connect to a CRM or email marketing service
    // 3. Implement email verification

    // For demo purposes, we'll save to a local JSON file
    const waitlistFilePath = path.join(process.cwd(), "data", "waitlist.json");
    let waitlist: WaitlistEntry[] = [];

    try {
      // Read existing file if it exists
      if (fs.existsSync(waitlistFilePath)) {
        const fileContent = fs.readFileSync(waitlistFilePath, "utf8");
        waitlist = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error("Error reading waitlist file:", error);
      // If file is corrupted, start with empty array
      waitlist = [];
    }

    // Check if email already exists
    const emailExists = waitlist.some((entry) => entry.email === email);
    if (emailExists) {
      return NextResponse.json(
        { message: "Email already registered for waitlist" },
        { status: 200 },
      );
    }

    // Add new entry
    waitlist.push(waitlistEntry);

    // Write back to file
    fs.writeFileSync(
      waitlistFilePath,
      JSON.stringify(waitlist, null, 2),
      "utf8",
    );

    return NextResponse.json(
      { message: "Successfully added to waitlist" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing waitlist submission:", error);
    return NextResponse.json(
      { error: "Failed to process waitlist submission" },
      { status: 500 },
    );
  }
}

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
