"use client";

import { TinaProvider, TinaCMS } from "tinacms";

export default function AdminPage() {
  return (
    <TinaProvider cms={new TinaCMS({
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
      branch: "main",
      token: process.env.TINA_TOKEN,
      organization: "g-but",
      isLocalClient: Boolean(process.env.TINA_PUBLIC_IS_LOCAL),
    })}>
        <div>Loading...</div>
    </TinaProvider>
  );
}
