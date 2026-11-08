function summaryText(summary) {
  return summary?.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim()
    || "No summary details provided.";
}

export default function ShowModal({ details }) {
  const show = details.show;
  if (!show) return null;
  const image = show.image?.original || show.image?.medium;
  return (
    <div className="modal d-block bg-black bg-opacity-75" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && details.setShow(null)}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <section className="modal-content" role="dialog" aria-modal="true" aria-labelledby="detail-title">
          <div className="modal-header"><h2 className="modal-title fs-5" id="detail-title">{show.name}</h2>
            <button className="btn-close" aria-label="Close" onClick={() => details.setShow(null)} /></div>
          <div className="modal-body">
            {image && <img className="img-fluid rounded mb-3" src={image} alt={`${show.name} poster`} />}
            <p className="text-secondary">{show.premiered?.slice(0, 4) || "Year unknown"} · {show.runtime ? `${show.runtime} min` : "Runtime unknown"} · {show.network?.name || show.webChannel?.name || "Unknown network"}</p>
            <h3 className="h6 text-danger">Overview</h3>
            <p>{details.loading ? "Loading show details…" : summaryText(show.summary)}</p>
            {details.error && <p className="text-danger">{details.error}</p>}
            {show.url && <a href={show.url} target="_blank" rel="noreferrer">View on TVMaze <i className="bi bi-box-arrow-up-right" /></a>}
          </div>
        </section>
      </div>
    </div>
  );
}
