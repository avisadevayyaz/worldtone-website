import secureStorage from "react-secure-storage";

export const secureStorageUtils = {
  getItem: <T>(key: string): T | null => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const item = secureStorage.getItem(key);
      if (item === null || item === undefined) {
        return null;
      }
      if (typeof item === "string") {
        try {
          const parsed = JSON.parse(item);
          return parsed as T;
        } catch {
          return item as T;
        }
      }
      return item as T;
    } catch {
      return null;
    }
  },

  setItem: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);
      secureStorage.setItem(key, stringValue);
    } catch {
      // Ignore errors
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      secureStorage.removeItem(key);
    } catch {
      // Ignore errors
    }
  },

  clear: (): void => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      secureStorage.clear();
    } catch {
      // Ignore errors
    }
  },
};
