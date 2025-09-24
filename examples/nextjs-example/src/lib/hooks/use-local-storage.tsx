"use client";

import { useState, useEffect, useCallback } from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): { value: T; setValue: (val: SetValue<T>) => void; isPending: boolean } {
  // Check if we're in the browser
  const isBrowser = typeof window !== "undefined";

  // State to track if we're still loading from localStorage
  const [isPending, setIsPending] = useState<boolean>(true);

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowser) {
      return initialValue;
    }

    const item = window.localStorage.getItem(key);
    if (item) return item as T;
    return initialValue;
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to local storage
        if (isBrowser) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, isBrowser],
  );

  // Set isPending to false after initial load
  useEffect(() => {
    if (isBrowser) {
      setIsPending(false);
    }
  }, [isBrowser]);

  // Listen for changes to this key from other tabs/windows
  useEffect(() => {
    if (!isBrowser) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(
            `Error parsing localStorage value for key "${key}":`,
            error,
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, isBrowser]);

  return { value: storedValue, setValue, isPending };
}

export default useLocalStorage;
