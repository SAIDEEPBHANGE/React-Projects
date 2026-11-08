import { weatherDescription } from "./weatherDescription";

const GEOCODING_URL = "https://nominatim.openstreetmap.org/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL = "https://api.open-meteo.com/v1/air-quality";

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.reason || `Request failed (${response.status}).`);
  }

  return data;
}

export async function getCoordinates(placeName, signal) {
  const params = new URLSearchParams({
    format: "jsonv2",
    q: placeName,
    limit: "1",
    addressdetails: "1",
  });
  const results = await fetchJson(`${GEOCODING_URL}?${params}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  const result = results[0];

  if (!result) {
    throw new Error("Location not found. Check the spelling and try again.");
  }

  const address = result.address || {};
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county ||
    result.name;
  const name = [city, address.country]
    .filter((part, index, parts) => part && parts.indexOf(part) === index)
    .join(", ");

  return {
    name: name || result.display_name,
    latitude: Number(result.lat),
    longitude: Number(result.lon),
  };
}

export async function getLocationName(latitude, longitude, signal) {
  const params = new URLSearchParams({
    format: "jsonv2",
    lat: String(latitude),
    lon: String(longitude),
    addressdetails: "1",
  });
  const result = await fetchJson(
    `https://nominatim.openstreetmap.org/reverse?${params}`,
    {
      headers: { Accept: "application/json" },
      signal,
    },
  );
  const address = result.address || {};
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.county;

  return [city, address.country].filter(Boolean).join(", ") || "Current Location";
}

export default async function fetchWeatherDashboard(
  location,
  temperatureUnit = "celsius",
  signal,
) {
  if (!location || (typeof location === "string" && !location.trim())) {
    throw new Error("Enter a city or town to search.");
  }

  const coordinates =
    typeof location === "string" ? await getCoordinates(location.trim(), signal) : location;

  if (
    !Number.isFinite(coordinates.latitude) ||
    !Number.isFinite(coordinates.longitude)
  ) {
    throw new Error("The selected location has invalid coordinates.");
  }

  const isFahrenheit = temperatureUnit === "fahrenheit";
  const weatherParams = new URLSearchParams({
    latitude: String(coordinates.latitude),
    longitude: String(coordinates.longitude),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset",
    temperature_unit: isFahrenheit ? "fahrenheit" : "celsius",
    wind_speed_unit: isFahrenheit ? "mph" : "kmh",
    timezone: "auto",
    forecast_days: "6",
  });
  const airQualityParams = new URLSearchParams({
    latitude: String(coordinates.latitude),
    longitude: String(coordinates.longitude),
    current: "european_aqi",
    timezone: "auto",
  });

  const [weatherResult, airQualityResult] = await Promise.allSettled([
    fetchJson(`${WEATHER_URL}?${weatherParams}`, { signal }),
    fetchJson(`${AIR_QUALITY_URL}?${airQualityParams}`, { signal }),
  ]);

  if (weatherResult.status === "rejected") {
    throw weatherResult.reason;
  }

  const weather = weatherResult.value;
  if (!weather.current || !weather.daily || !weather.current_units) {
    throw new Error("Weather data was incomplete. Please try again.");
  }

  return {
    location: coordinates,
    weather,
    airQuality:
      airQualityResult.status === "fulfilled"
        ? airQualityResult.value
        : null,
    description:
      weatherDescription[weather.current.weather_code] || {
        text: "Unknown Conditions",
        icon: "bi-cloud-fill text-muted",
        bg: "bg-light",
      },
  };
}

export function getUvLabel(uvIndex) {
  if (!Number.isFinite(uvIndex)) return "Unavailable";
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex <= 10) return "Very High";
  return "Extreme";
}

export function getAqiLabel(aqi) {
  if (!Number.isFinite(aqi)) return "Unavailable";
  if (aqi <= 20) return "Excellent";
  if (aqi <= 40) return "Good";
  if (aqi <= 60) return "Fair";
  if (aqi <= 80) return "Poor";
  if (aqi <= 100) return "Very Poor";
  return "Extremely Poor";
}
