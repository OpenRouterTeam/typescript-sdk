"use client";

import { OPENROUTER_KEY_LOCALSTORAGE_KEY } from "@/lib/config";
import { useApiKey } from "@/lib/hooks/use-api-key";
import { OpenRouterClientProvider } from "@/lib/hooks/use-openrouter-client";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OpenRouterClientProvider>{children}</OpenRouterClientProvider>;
}
