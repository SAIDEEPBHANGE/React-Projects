import { useEffect, useMemo, useRef, useState } from "react";

const PAGE_SIZE = 12;

export function useVisibleShows(shows, view, genre, query) {
  const trigger = useRef(null);
  const [page, setPage] = useState({ key: "", count: PAGE_SIZE });
  const key = `${view}|${genre}|${query}|${shows.map((show) => show.id).join(",")}`;
  const count = page.key === key ? page.count : PAGE_SIZE;
  const visible = useMemo(() => shows.slice(0, count), [shows, count]);

  useEffect(() => {
    if (!trigger.current || count >= shows.length) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setPage((old) => ({
        key, count: Math.min((old.key === key ? old.count : PAGE_SIZE) + PAGE_SIZE, shows.length),
      }));
    }, { rootMargin: "160px" });
    observer.observe(trigger.current);
    return () => observer.disconnect();
  }, [key, count, shows.length]);

  return { shows: visible, count: Math.min(count, shows.length), trigger };
}
