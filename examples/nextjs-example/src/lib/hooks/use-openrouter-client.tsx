'use client';

import { OpenRouter } from '@openrouter/sdk';
import React from 'react';
import { useApiKey } from './use-api-key';

interface OpenRouterClientContextApi {
  client: OpenRouter;
}

const OpenRouterClientContext = React.createContext<OpenRouterClientContextApi>(null!);

export function OpenRouterClientProvider({ children }: { children: React.ReactNode }) {
  const [apiKey] = useApiKey();

  const client = React.useMemo(() => {
    return new OpenRouter({
      apiKey: apiKey,
    });
  }, [
    apiKey,
  ]);

  return (
    <OpenRouterClientContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </OpenRouterClientContext.Provider>
  );
}

export function useOpenRouter() {
  const context = React.useContext(OpenRouterClientContext);
  if (!context) {
    throw new Error('useOpenRouter must be used within an OpenRouterClientProvider');
  }

  return context;
}
