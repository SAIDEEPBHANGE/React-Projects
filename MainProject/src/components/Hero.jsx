export default function Hero({ catalog, onSearchChange }) {
  return (
    <section className="bg-black border-bottom border-secondary-subtle">
      <div className="container py-5">
        <p className="text-danger text-uppercase small fw-semibold">Your next favorite starts here</p>
        <h1 className="display-4 fw-bold">Find your next<br /><span className="text-danger">great watch.</span></h1>
        <p className="text-secondary">Explore shows worth talking about. Search, save, and settle in.</p>
        <form className="input-group mt-4" role="search" onSubmit={(event) => event.preventDefault()}>
          <span className="input-group-text"><i className="bi bi-search" /></span>
          <input className="form-control" aria-label="Search TV shows" placeholder="Search TV shows..." value={catalog.query} onChange={(event) => { catalog.search(event.target.value); onSearchChange(); }} />
          {catalog.query && <button className="btn btn-outline-secondary" type="button" onClick={catalog.clearSearch} aria-label="Clear search"><i className="bi bi-x-lg" /></button>}
        </form>
        <p className="text-secondary small mt-3 mb-0"><i className="bi bi-stars text-danger me-2" />Discover something new</p>
      </div>
    </section>
  );
}
