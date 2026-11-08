import { useEffect, useState } from "react";

function readValue(key, fallback, validate) {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return fallback;
    const value = JSON.parse(stored);
    return validate(value) ? value : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
}

export function useStoredValue(key, fallback, validate) {
  const [value, setValue] = useState(() => readValue(key, fallback, validate));
  useEffect(() => {
    try {
      if (value === null) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to save ${key} to local storage.`, error);
    }
  }, [key, value]);
  return [value, setValue];
}
