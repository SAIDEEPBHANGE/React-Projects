import { useStoredValue } from "./useStoredValue.js";

export function useLibrary() {
  const [favorites, setFavorites] = useStoredValue("moviehub_favs", [], Array.isArray);
  const [watchlist, setWatchlist] = useStoredValue("moviehub_watch", [], Array.isArray);
  const [user, setUser] = useStoredValue("moviehub_user", null, (value) => value === null || (typeof value === "object" && typeof value.username === "string"));

  function toggle(show, collection, update) {
    update(collection.some((item) => item.id === show.id)
      ? collection.filter((item) => item.id !== show.id)
      : [...collection, show]);
  }

  return {
    favorites, watchlist, user, setUser,
    toggleFavorite: (show) => toggle(show, favorites, setFavorites),
    toggleWatchlist: (show) => toggle(show, watchlist, setWatchlist),
  };
}
