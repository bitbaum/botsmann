"use client";

import dynamic from 'next/dynamic';

const TinaWrapper = dynamic(() => import('tinacms').then((mod) => {
  const { TinaProvider, TinaCMS } = mod;
  return function TinaWrap({ children }: { children: React.ReactNode }) {
    return (
      <TinaProvider
        cms={new TinaCMS({
          clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
          branch: "main",
          token: process.env.TINA_TOKEN,
          organization: "g-but",
          isLocalClient: Boolean(process.env.TINA_PUBLIC_IS_LOCAL),
        })}
      >
        {children}
      </TinaProvider>
    );
  };
}), { ssr: false });

export default function AdminPage() {
  return (
    <TinaWrapper>
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading TinaCMS...</div>
      </div>
    </TinaWrapper>
  );
}
