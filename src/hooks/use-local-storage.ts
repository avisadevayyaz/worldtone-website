import { useEffect, useState } from "react";
import { secureStorageUtils } from "@/src/lib/secure-storage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = secureStorageUtils.getItem<T>(key);
      return item ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)): void => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        secureStorageUtils.setItem(key, valueToStore);
      }
    } catch {
      // Ignore errors
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const item = secureStorageUtils.getItem<T>(key);
      if (item !== null) {
        setStoredValue(item);
      }
    } catch {
      // Ignore errors
    }
  }, [key]);

  return [storedValue, setValue];
}
