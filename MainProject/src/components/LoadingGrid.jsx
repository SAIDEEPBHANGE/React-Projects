export default function LoadingGrid() {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3" role="status" aria-label="Loading shows">
      {Array.from({ length: 8 }, (_, index) => (
        <div className="col" key={index}><div className="card bg-black border-secondary-subtle">
          <div className="ratio ratio-4x3 placeholder-glow"><span className="placeholder col-12" /></div>
          <div className="card-body placeholder-glow"><span className="placeholder col-8" /><span className="placeholder col-5 mt-2" /></div>
        </div></div>
      ))}
    </div>
  );
}
