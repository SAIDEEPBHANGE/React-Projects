function poster(show) {
  return show.image?.medium || show.image?.original;
}

export default function ShowCard({ show, library, onDetails }) {
  const favorite = library.favorites.some((item) => item.id === show.id);
  const saved = library.watchlist.some((item) => item.id === show.id);
  return (
    <article className="card h-100 bg-black border-secondary-subtle">
      <div className="ratio ratio-4x3 bg-secondary">
        {poster(show) ? <img className="card-img-top object-fit-cover" src={poster(show)} alt={`${show.name} poster`} loading="lazy" /> : <div className="d-flex align-items-center justify-content-center"><i className="bi bi-film fs-1" /></div>}
      </div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2">
          <h2 className="h6 text-truncate" title={show.name}>{show.name}</h2>
          {show.rating?.average && <span className="badge text-bg-warning"><i className="bi bi-star-fill" /> {show.rating.average}</span>}
        </div>
        <p className="text-secondary small">{show.premiered?.slice(0, 4) || "Year unknown"} · {show.language || "Unknown"}</p>
        <p className="small text-secondary">{show.genres?.slice(0, 2).join(" · ") || "Genre unknown"}</p>
        <div className="mt-auto d-flex gap-2">
          <button className={`btn btn-sm ${favorite ? "btn-danger" : "btn-outline-light"}`} aria-label="Toggle favorite" onClick={() => library.toggleFavorite(show)}><i className="bi bi-heart-fill" /></button>
          <button className={`btn btn-sm ${saved ? "btn-warning" : "btn-outline-light"}`} aria-label="Toggle watchlist" onClick={() => library.toggleWatchlist(show)}><i className="bi bi-bookmark-plus" /></button>
          <button className="btn btn-sm btn-outline-danger flex-grow-1" onClick={() => onDetails(show)}>Show details</button>
        </div>
      </div>
    </article>
  );
}
