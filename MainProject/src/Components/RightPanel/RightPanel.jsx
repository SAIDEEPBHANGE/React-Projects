function RightPanel({
  searchLocationName,
  setSearchLocationName,
  onSearch,
  onDetectLocation,
  onUnitChange,
  temperatureUnit,
  recentSearches,
  onSelectRecentSearch,
  isLoading,
  isDetectingLocation,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <div className="col-lg-4">
      <div className="card shadow-lg border-0 rounded-4 mb-4">
        <div className="card-body">
          <h2 className="h5 card-title fw-bold mb-3">Location Search</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="city" className="visually-hidden">
              City or town
            </label>
            <div className="input-group mb-2">
              <input
                type="search"
                id="city"
                className="form-control"
                placeholder="Enter city name..."
                value={searchLocationName}
                onChange={(event) => setSearchLocationName(event.target.value)}
                autoComplete="off"
              />
              <button
                className="btn btn-primary"
                type="submit"
                aria-label="Search location"
                disabled={isLoading || !searchLocationName.trim()}
              >
                <i className="bi bi-search" aria-hidden="true"></i>
              </button>
            </div>
          </form>

          <button
            className="btn btn-outline-secondary w-100 mb-3 btn-sm"
            type="button"
            onClick={onDetectLocation}
            disabled={isLoading || isDetectingLocation}
          >
            {isDetectingLocation ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  aria-hidden="true"
                ></span>
                Detecting location...
              </>
            ) : (
              <>
                <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>{" "}
                Detect My Location
              </>
            )}
          </button>

          <div className="d-flex justify-content-between align-items-center border-top pt-3">
            <span className="fw-semibold text-muted small">
              Temperature Unit:
            </span>
            <div
              className="btn-group btn-group-sm"
              role="group"
              aria-label="Temperature unit"
            >
              <input
                type="radio"
                className="btn-check"
                name="unitToggle"
                id="unitC"
                value="celsius"
                checked={temperatureUnit === "celsius"}
                onChange={() => onUnitChange("celsius")}
              />
              <label className="btn btn-outline-primary" htmlFor="unitC">
                °C
              </label>
              <input
                type="radio"
                className="btn-check"
                name="unitToggle"
                id="unitF"
                value="fahrenheit"
                checked={temperatureUnit === "fahrenheit"}
                onChange={() => onUnitChange("fahrenheit")}
              />
              <label className="btn btn-outline-primary" htmlFor="unitF">
                °F
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body">
          <h2 className="h6 fw-bold text-muted mb-2">Recent Searches</h2>
          <div className="list-group list-group-flush small rounded-3 overflow-hidden">
            {recentSearches.length === 0 ? (
              <div className="text-center text-muted py-2 small">
                No recent searches
              </div>
            ) : (
              recentSearches.map((location) => (
                <button
                  className="list-group-item list-group-item-action text-start text-truncate py-2"
                  type="button"
                  key={location}
                  onClick={() => onSelectRecentSearch(location)}
                >
                  <i
                    className="bi bi-clock-history me-2 text-muted"
                    aria-hidden="true"
                  ></i>
                  {location}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
