import { useEffect, useState } from "react";

export function useShowDetails() {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function open(item) {
    setShow(item);
    setError("");
    if (item.summary || item.url) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.tvmaze.com/shows/${item.id}`);
      if (!response.ok) throw new Error(`TVMaze returned ${response.status}.`);
      setShow(await response.json());
    } catch (cause) {
      console.error("Unable to load show details.", cause);
      setError("We couldn't load the show details. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!show) return undefined;
    function closeOnEscape(event) {
      if (event.key === "Escape") setShow(null);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [show]);

  return { show, setShow, loading, error, open };
}
