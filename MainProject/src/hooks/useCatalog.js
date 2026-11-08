import { useState } from "react";

export function useCatalog() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState("home");
  const [genre, setGenre] = useState("All");
  const [retryKey, setRetryKey] = useState(0);

  function search(value) {
    setQuery(value);
    setView("home");
  }

  function clearSearch() {
    setQuery("");
    setGenre("All");
    setView("home");
  }

  return {
    query, view, genre, retryKey, setView, setGenre, search, clearSearch,
    retry: () => setRetryKey((key) => key + 1),
  };
}
