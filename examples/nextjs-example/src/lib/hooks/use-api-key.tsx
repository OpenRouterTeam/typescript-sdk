import { useLocalStorage } from "usehooks-ts";
import { OPENROUTER_KEY_LOCALSTORAGE_KEY } from "../config";

const EMPTY_VALUE = "";
const FALLBACK_VALUE = undefined;

/**
 * A hook to manage the OpenRouter API key in local storage.
 *
 * @returns A tuple containing the API key and a function to update it.
 *
 * @example
 * ```tsx
 * const [apiKey, setApiKey, removeApiKey] = useApiKey();
 * ```
 */
export function useApiKey() {
  return useLocalStorage<string | undefined>(
    OPENROUTER_KEY_LOCALSTORAGE_KEY,
    undefined,
    {
      deserializer: (value) => (value !== EMPTY_VALUE ? value : FALLBACK_VALUE),
      serializer: (value) => value || EMPTY_VALUE,
      initializeWithValue: false,
    },
  );
}
