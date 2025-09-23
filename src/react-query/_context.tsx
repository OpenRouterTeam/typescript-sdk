
import React from "react";

import { OpenRouterCore } from "../core.js";

const OpenRouterContext = React.createContext<OpenRouterCore | null>(null);

export function OpenRouterProvider(props: { client: OpenRouterCore, children: React.ReactNode }): React.ReactNode { 
  return (
    <OpenRouterContext.Provider value={props.client}>
      {props.children}
    </OpenRouterContext.Provider>
  );
}

export function useOpenRouterContext(): OpenRouterCore { 
  const value = React.useContext(OpenRouterContext);
  if (value === null) {
    throw new Error("SDK not initialized. Create an instance of OpenRouterCore and pass it to <OpenRouterProvider />.");
  }
  return value;
}
