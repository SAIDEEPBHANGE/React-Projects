export default function EmptyState({ view, query, onExplore }) {
  const title = view === "favorites" ? "Your favorites live here"
    : view === "watchlist" ? "Your watchlist is ready"
      : query ? "No shows found" : "No shows match this genre";
  return (
    <div className="text-center py-5">
      <i className="bi bi-film display-5 text-secondary" />
      <h2 className="h5 mt-3">{title}</h2>
      <p className="text-secondary">Save shows while browsing, or try a different search or genre.</p>
      {(view !== "home" || query) && <button className="btn btn-danger rounded-pill" onClick={onExplore}>Explore shows</button>}
    </div>
  );
}
