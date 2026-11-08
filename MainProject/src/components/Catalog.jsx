import EmptyState from "./EmptyState.jsx";
import GenreFilter from "./GenreFilter.jsx";
import LoadingGrid from "./LoadingGrid.jsx";
import ShowGrid from "./ShowGrid.jsx";

export default function Catalog({ catalog, library, data, shows, count, total, trigger, onDetails }) {
  const title = catalog.view === "favorites" ? "Your favorites"
    : catalog.view === "watchlist" ? "Your watchlist"
      : catalog.query.trim() ? "Search results" : "Trending shows";
  const loading = catalog.view === "home" && (catalog.query.trim() ? data.searchLoading : data.homeLoading);
  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-end">
        <div><p className="text-secondary text-uppercase small mb-1">The collection</p><h2 className="h3 mb-1">{title}</h2>
          <p className="text-secondary small mb-0">Showing {count} of {total} titles</p></div>
      </div>
      <GenreFilter selected={catalog.genre} onSelect={catalog.setGenre} />
      {data.error && catalog.view === "home" ? <div className="alert alert-danger">{data.error} <button className="btn btn-sm btn-danger ms-2" onClick={catalog.retry}>Try again</button></div>
        : loading ? <LoadingGrid />
          : shows.length ? <ShowGrid shows={shows} library={library} onDetails={onDetails} />
            : <EmptyState view={catalog.view} query={catalog.query} onExplore={catalog.clearSearch} />}
      {count < total && !loading && <div ref={trigger} className="py-2" aria-hidden="true" />}
    </main>
  );
}
