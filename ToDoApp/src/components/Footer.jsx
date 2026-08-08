function Footer({ ClearCompleted, MarkAllComplete }) {
  return (
    <div className="card-footer bg-white text-center py-3 rounded-bottom-4">
      <button className="btn btn-success me-2" onClick={MarkAllComplete}>
        Mark All Complete
      </button>

      <button className="btn btn-outline-secondary" onClick={ClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}
export default Footer;
