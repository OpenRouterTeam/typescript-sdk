'use client';

import { OpenRouterClientProvider } from '@/lib/hooks/use-openrouter-client';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OpenRouterClientProvider>{children}</OpenRouterClientProvider>;
}
