function RightColumn() {
  return (
    <div className="col-lg-8">
      <div
        id="error"
        className="alert alert-danger d-none rounded-4 shadow-sm"
        role="alert"
      >
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        <span id="errorMsg">City not found! Please check spelling.</span>
      </div>
      <div id="weatherContent" className="d-none animate-fade-in">
        <div className="card shadow-lg border-0 rounded-4 mb-4 text-white main-weather-card">
          <div className="card-body p-4 text-center">
            <h3 id="cityName" className="fw-bold fs-4 m-0"></h3>
            <div
              id="weatherIconContainer"
              className="my-2 animate-bounce"
            ></div>
            <h1 id="temp" className="display-3 fw-bold m-0"></h1>
            <p
              id="description"
              className="text-capitalize fs-5 mb-0 opacity-90"
            ></p>
          </div>
        </div>
        <div className="row g-3 mb-4">
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center rounded-4 glass-card">
              <div className="card-body py-3">
                <i className="bi bi-droplet-fill text-primary fs-3"></i>
                <h6 className="text-muted small mt-1">Humidity</h6>
                <p id="humidity" className="fw-bold fs-5 mb-0">
                  -
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center rounded-4 glass-card">
              <div className="card-body py-3">
                <i className="bi bi-wind text-success fs-3"></i>
                <h6 className="text-muted small mt-1">Wind Speed</h6>
                <p id="wind" className="fw-bold fs-5 mb-0">
                  -
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center rounded-4 glass-card">
              <div className="card-body py-3">
                <i className="bi bi-thermometer-half text-danger fs-3"></i>
                <h6 className="text-muted small mt-1">Feels Like</h6>
                <p id="feelsLike" className="fw-bold fs-5 mb-0">
                  -
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center rounded-4 glass-card">
              <div className="card-body py-3">
                <i className="bi bi-sun-fill text-warning fs-3"></i>
                <h6 className="text-muted small mt-1">UV Index</h6>
                <p id="uvIndex" className="fw-bold fs-5 mb-0">
                  -
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center rounded-4 glass-card">
              <div className="card-body py-3">
                <i className="bi bi-shield-fill-check text-info fs-3"></i>
                <h6 className="text-muted small mt-1">Air Quality Index</h6>
                <p id="aqi" className="fw-bold fs-5 mb-0">
                  -
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center rounded-4 glass-card">
              <div className="card-body py-3">
                <i className="bi bi-horizon-fill text-secondary fs-3"></i>
                <h6 className="text-muted small mt-1">Sun Cycle</h6>
                <div className="small mt-1">
                  <div>
                    <i className="bi bi-sunrise text-warning"></i>
                    <span id="sunrise">-</span>
                  </div>
                  <div>
                    <i className="bi bi-sunset text-danger"></i>
                    <span id="sunset">-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow-lg border-0 rounded-4 glass-card mb-4">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-calendar3 me-2"></i>5-Day Forecast
            </h5>
            <div
              id="forecastContainer"
              className="row row-cols-1 row-cols-sm-5 g-2 text-center"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RightColumn;
