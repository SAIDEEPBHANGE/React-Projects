export default function Header({ catalog, library }) {
  const links = [["home", "Discover"], ["favorites", "Favorites"], ["watchlist", "Watchlist"]];
  return (
    <header className="border-bottom border-secondary-subtle">
      <nav className="container py-3" aria-label="Main navigation">
        <div className="row align-items-center g-2">
          <div className="col">
            <a className="navbar-brand fw-bold text-light" href="#home" onClick={() => catalog.setView("home")}>
              <i className="bi bi-play-btn-fill text-danger me-2" />Reelwatch
            </a>
          </div>
          <div className="col-auto order-2 order-md-2">
            {library.user
              ? <button className="btn btn-outline-light btn-sm rounded-pill" onClick={() => library.setUser(null)}>Log out</button>
              : <button className="btn btn-danger btn-sm rounded-pill" onClick={() => library.setUser({ username: "Guest User" })}>Mock login</button>}
          </div>
          <div className="col-12 col-md order-3 order-md-1">
            <div className="navbar-nav flex-row justify-content-between justify-content-md-center gap-2 gap-md-4">
              {links.map(([view, label]) => (
                <button key={view} className={`nav-link ${catalog.view === view ? "active" : ""}`} onClick={() => catalog.setView(view)}>
                  {label} {view === "favorites" ? library.favorites.length : view === "watchlist" ? library.watchlist.length : ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
