"use client";

import { TinaProvider } from "tinacms/dist/react";
import TinaCMS from "tinacms";
import { TinaEditProvider } from "tinacms/dist/edit-state";

export default function AdminPage() {
  return (
    <TinaProvider cms={new TinaCMS({
      clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
      branch: "main",
      token: process.env.TINA_TOKEN,
      organization: "g-but",
      isLocalClient: Boolean(process.env.TINA_PUBLIC_IS_LOCAL),
    })}>
      <TinaEditProvider>
        <div>Loading...</div>
      </TinaEditProvider>
    </TinaProvider>
  );
}
