import ShowCard from "./ShowCard.jsx";

export default function ShowGrid({ shows, library, onDetails }) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3">
      {shows.map((show) => (
        <div className="col" key={show.id}><ShowCard show={show} library={library} onDetails={onDetails} /></div>
      ))}
    </div>
  );
}
