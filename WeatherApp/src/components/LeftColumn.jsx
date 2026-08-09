function LeftColumn() {
  return (
    <div className="col-lg-4">
      <div className="card shadow-lg border-0 rounded-4 mb-4 glass-card">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Location Search</h5>
          <div className="input-group mb-2">
            <input
              type="text"
              id="city"
              className="form-control"
              placeholder="Enter city name..."
            />
            <button className="btn btn-primary" id="searchBtn">
              <i className="bi bi-search"></i>
            </button>
          </div>
          <button
            className="btn btn-outline-secondary w-100 mb-3 btn-sm"
            id="geoBtn"
          >
            <i className="bi bi-geo-alt-fill"></i> Detect My Location
          </button>
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <span className="fw-semibold text-muted small">
              Temperature Unit:
            </span>
            <div className="btn-group btn-group-sm" role="group">
              <input
                type="radio"
                className="btn-check"
                name="unitToggle"
                id="unitC"
                checked
              />
              <label className="btn btn-outline-primary" for="unitC">
                °C
              </label>
              <input
                type="radio"
                className="btn-check"
                name="unitToggle"
                id="unitF"
              />
              <label className="btn btn-outline-primary" for="unitF">
                °F
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="card shadow-lg border-0 rounded-4 glass-card">
        <div className="card-body">
          <h6 className="fw-bold text-muted mb-2">Recent Searches</h6>
          <div
            id="recentSearches"
            className="list-group list-group-flush small rounded-3 overflow-hidden"
          ></div>
        </div>
      </div>
    </div>
  );
}
export default LeftColumn;
