import { useCatalog } from "./hooks/useCatalog.js";
import { useLibrary } from "./hooks/useLibrary.js";
import { useShowDetails } from "./hooks/useShowDetails.js";
import { useTvMaze } from "./hooks/useTvMaze.js";
import { useVisibleShows } from "./hooks/useVisibleShows.js";
import Catalog from "./components/Catalog.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ShowModal from "./components/ShowModal.jsx";

export default function App() {
  const catalog = useCatalog();
  const library = useLibrary();
  const data = useTvMaze(catalog.query, catalog.view, catalog.retryKey);
  const source = catalog.view === "favorites" ? library.favorites
    : catalog.view === "watchlist" ? library.watchlist
      : catalog.query.trim() ? data.searchResults : data.homeShows;
  const filtered = catalog.genre === "All" ? source
    : source.filter((show) => show.genres?.includes(catalog.genre));
  const visible = useVisibleShows(filtered, catalog.view, catalog.genre, catalog.query);
  const details = useShowDetails();

  return (
    <div data-bs-theme="dark" className="min-vh-100 bg-dark text-light">
      <Header catalog={catalog} library={library} />
      <Hero catalog={catalog} onSearchChange={() => data.setError("")} />
      <Catalog catalog={catalog} library={library} data={data} shows={visible.shows} count={visible.count} total={filtered.length} trigger={visible.trigger} onDetails={details.open} />
      <Footer />
      <ShowModal details={details} />
    </div>
  );
}
