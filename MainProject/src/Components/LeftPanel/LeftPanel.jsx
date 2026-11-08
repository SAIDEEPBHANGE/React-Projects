import {
  getAqiLabel,
  getUvLabel,
} from "../../utils/fetchWeatherDashboard";
import { weatherDescription } from "../../utils/weatherDescription";

function MetricCard({ icon, iconColor, label, children }) {
  return (
    <div className="col-sm-6 col-md-4">
      <div className="card h-100 border-0 shadow-sm text-center rounded-4">
        <div className="card-body py-3">
          <i className={`bi ${icon} ${iconColor} fs-3`} aria-hidden="true"></i>
          <h6 className="text-muted small mt-1">{label}</h6>
          <p className="fw-bold fs-5 mb-0">{children}</p>
        </div>
      </div>
    </div>
  );
}

function formatTime(value) {
  if (!value) return "--:--";
  return value.split("T")[1] || value;
}

function LeftPanel({ dashboard, error, isLoading }) {
  const weather = dashboard?.weather;
  const current = weather?.current;
  const currentUnits = weather?.current_units;
  const daily = weather?.daily;
  const dailyUnits = weather?.daily_units;
  const currentCode = current?.weather_code;
  const description =
    dashboard?.description ||
    weatherDescription[currentCode] || {
      text: "Unknown Conditions",
      icon: "bi-cloud-fill text-muted",
    };
  const aqi = dashboard?.airQuality?.current?.european_aqi;
  const uvIndex = daily?.uv_index_max?.[0];
  const forecastDays = daily?.time?.slice(1, 6) || [];

  return (
    <div className="col-lg-8">
      {error && (
        <div className="alert alert-danger rounded-4 shadow-sm" role="alert">
          <i
            className="bi bi-exclamation-triangle-fill me-2"
            aria-hidden="true"
          ></i>
          {error}
        </div>
      )}

      {isLoading && (
        <div className="card border-0 shadow-sm rounded-4 mb-4" role="status">
          <div className="card-body text-center py-5">
            <span
              className="spinner-border text-primary mb-3"
              aria-hidden="true"
            ></span>
            <p className="mb-0 text-muted">Loading weather...</p>
          </div>
        </div>
      )}

      {!dashboard && !isLoading && !error && (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body text-center py-5">
            <i
              className="bi bi-cloud-sun display-3 text-primary"
              aria-hidden="true"
            ></i>
            <h2 className="h4 fw-bold mt-3">Weather at a glance</h2>
            <p className="text-muted mb-0">
              Search for a location or detect your location to get started.
            </p>
          </div>
        </div>
      )}

      {dashboard && (
        <div aria-live="polite">
          <div className="card shadow-lg border-0 rounded-4 mb-4 text-white bg-dark">
            <div className="card-body p-4 text-center">
              <h2 className="fw-bold fs-4 m-0">{dashboard.location.name}</h2>
              <div className="my-2">
                <i
                  className={`bi ${description.icon} display-1`}
                  aria-hidden="true"
                ></i>
              </div>
              <p className="display-3 fw-bold m-0">
                {Math.round(current.temperature_2m)}
                {currentUnits.temperature_2m}
              </p>
              <p className="text-capitalize fs-5 mb-0 opacity-90">
                {description.text}
              </p>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <MetricCard
              icon="bi-droplet-fill"
              iconColor="text-primary"
              label="Humidity"
            >
              {current.relative_humidity_2m}
              {currentUnits.relative_humidity_2m}
            </MetricCard>
            <MetricCard
              icon="bi-wind"
              iconColor="text-success"
              label="Wind Speed"
            >
              {current.wind_speed_10m} {currentUnits.wind_speed_10m}
            </MetricCard>
            <MetricCard
              icon="bi-thermometer-half"
              iconColor="text-danger"
              label="Feels Like"
            >
              {Math.round(current.apparent_temperature)}
              {currentUnits.apparent_temperature}
            </MetricCard>
            <MetricCard
              icon="bi-sun-fill"
              iconColor="text-warning"
              label="UV Index"
            >
              {Number.isFinite(uvIndex)
                ? `${uvIndex} (${getUvLabel(uvIndex)})`
                : "Unavailable"}
            </MetricCard>
            <MetricCard
              icon="bi-shield-fill-check"
              iconColor="text-info"
              label="Air Quality Index"
            >
              {Number.isFinite(aqi)
                ? `${aqi} (${getAqiLabel(aqi)})`
                : "Unavailable"}
            </MetricCard>
            <div className="col-sm-6 col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center rounded-4">
                <div className="card-body py-3">
                  <i
                    className="bi bi-horizon-fill text-secondary fs-3"
                    aria-hidden="true"
                  ></i>
                  <h6 className="text-muted small mt-1">Sun Cycle</h6>
                  <div className="small mt-1">
                    <div>
                      <i
                        className="bi bi-sunrise text-warning me-1"
                        aria-hidden="true"
                      ></i>
                      <span>{formatTime(daily.sunrise?.[0])}</span>
                    </div>
                    <div>
                      <i
                        className="bi bi-sunset text-danger me-1"
                        aria-hidden="true"
                      ></i>
                      <span>{formatTime(daily.sunset?.[0])}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-lg border-0 rounded-4 mb-4">
            <div className="card-body p-4">
              <h3 className="h5 fw-bold mb-3">
                <i className="bi bi-calendar3 me-2" aria-hidden="true"></i>
                5-Day Forecast
              </h3>
              <div className="row row-cols-1 row-cols-sm-5 g-2 text-center">
                {forecastDays.map((date, index) => {
                  const dayCode = daily.weather_code?.[index + 1];
                  const dayDescription = weatherDescription[dayCode] || {
                    icon: "bi-cloud-fill text-muted",
                  };
                  const dayName = new Date(`${date}T12:00:00`).toLocaleDateString(
                    "en-US",
                    { weekday: "short" },
                  );
                  const maxTemperature = daily.temperature_2m_max?.[index + 1];
                  const minTemperature = daily.temperature_2m_min?.[index + 1];

                  return (
                    <div className="col" key={date}>
                      <div className="p-2 border rounded-3 bg-white bg-opacity-50 h-100">
                        <div className="fw-bold small text-muted mb-1">
                          {dayName}
                        </div>
                        <i
                          className={`bi ${dayDescription.icon} fs-4 my-1 d-block`}
                          aria-hidden="true"
                        ></i>
                        <div className="small fw-semibold mt-1">
                          {Math.round(maxTemperature)}
                          {dailyUnits.temperature_2m_max} /{" "}
                          <span className="text-muted fw-normal">
                            {Math.round(minTemperature)}
                            {dailyUnits.temperature_2m_min}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftPanel;
