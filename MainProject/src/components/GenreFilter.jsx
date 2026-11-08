const GENRES = ["All", "Drama", "Comedy", "Action", "Crime", "Romance", "Science-Fiction", "Thriller", "Mystery"];

export default function GenreFilter({ selected, onSelect }) {
  return (
    <div className="d-flex gap-2 overflow-x-auto py-3" aria-label="Filter by genre">
      {GENRES.map((genre) => (
        <button key={genre} className={`btn btn-sm rounded-pill text-nowrap ${selected === genre ? "btn-danger" : "btn-outline-secondary"}`} onClick={() => onSelect(genre)}>
          {genre === "All" ? "All shows" : genre}
        </button>
      ))}
    </div>
  );
}
