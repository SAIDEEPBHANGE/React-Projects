export default function Footer() {
  return (
    <footer className="container border-top border-secondary-subtle py-4 d-flex flex-wrap justify-content-between gap-2">
      <span className="fw-semibold"><i className="bi bi-play-btn-fill text-danger me-2" />Reelwatch</span>
      <span className="small text-secondary">Show data by <a href="https://www.tvmaze.com/" target="_blank" rel="noreferrer">TVMaze</a>.</span>
    </footer>
  );
}
