import { useEffect, useState } from "react";

const API = "https://api.tvmaze.com";

export function useTvMaze(query, view, retryKey) {
  const [homeShows, setHomeShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [homeLoading, setHomeLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  async function search(term, controller) {
    setSearchLoading(true);
    setError("");
    try {
      const response = await fetch(`${API}/search/shows?q=${encodeURIComponent(term.trim())}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`TVMaze returned ${response.status}.`);
      setSearchResults((await response.json()).map((item) => item.show));
    } catch (cause) {
      fail(cause, controller, setError);
    } finally {
      if (!controller.signal.aborted) setSearchLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/shows`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`TVMaze returned ${response.status}.`);
        return response.json();
      })
      .then(setHomeShows)
      .catch((cause) => fail(cause, controller, setError))
      .finally(() => { if (!controller.signal.aborted) setHomeLoading(false); });
    return () => controller.abort();
  }, [retryKey]);

  useEffect(() => {
    if (view !== "home" || !query.trim()) return undefined;
    const controller = new AbortController();
    const timer = setTimeout(() => search(query, controller), 350);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, view, retryKey]);

  return { homeShows, searchResults, homeLoading, searchLoading, error, setError };
}

function fail(error, controller, setError) {
  if (error.name === "AbortError") return;
  console.error("TVMaze request failed.", error);
  setError("Shows are unavailable right now. Please try again.");
}
