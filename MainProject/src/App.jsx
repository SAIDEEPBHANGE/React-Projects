import { useRef, useState } from "react";
import LeftPanel from "./Components/LeftPanel/LeftPanel";
import RightPanel from "./Components/RightPanel/RightPanel";
import fetchWeatherDashboard, {
  getLocationName,
} from "./utils/fetchWeatherDashboard";

const HISTORY_STORAGE_KEY = "weather_history";
const MAX_RECENT_SEARCHES = 5;

function readRecentSearches() {
  try {
    const storedSearches = JSON.parse(
      localStorage.getItem(HISTORY_STORAGE_KEY) || "[]",
    );
    return Array.isArray(storedSearches)
      ? storedSearches.filter((item) => typeof item === "string").slice(0, MAX_RECENT_SEARCHES)
      : [];
  } catch (error) {
    console.error("Could not read recent weather searches.", error);
    return [];
  }
}

function App() {
  const [searchLocationName, setSearchLocationName] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState("celsius");
  const [recentSearches, setRecentSearches] = useState(readRecentSearches);
  const [dashboard, setDashboard] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [error, setError] = useState("");
  const activeRequest = useRef(null);
  const requestId = useRef(0);

  async function loadWeather(location, options = {}) {
    activeRequest.current?.abort();
    const controller = new AbortController();
    const currentRequestId = ++requestId.current;
    activeRequest.current = controller;
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchWeatherDashboard(
        location,
        options.temperatureUnit || temperatureUnit,
        controller.signal,
      );
      if (currentRequestId !== requestId.current) return;

      setDashboard(result);
      setCurrentLocation(result.location);
      setSearchLocationName(result.location.name);

      if (options.addToHistory) {
        const updatedSearches = [
          result.location.name,
          ...recentSearches.filter(
            (item) => item.toLowerCase() !== result.location.name.toLowerCase(),
          ),
        ].slice(0, MAX_RECENT_SEARCHES);
        setRecentSearches(updatedSearches);
        try {
          localStorage.setItem(
            HISTORY_STORAGE_KEY,
            JSON.stringify(updatedSearches),
          );
        } catch (storageError) {
          console.error("Could not save recent weather searches.", storageError);
          setError("Weather loaded, but the recent search could not be saved.");
        }
      }
    } catch (requestError) {
      if (
        requestError.name === "AbortError" ||
        currentRequestId !== requestId.current
      ) {
        return;
      }
      setError(
        requestError.message ||
          "Unable to load weather right now. Please try again.",
      );
    } finally {
      if (currentRequestId === requestId.current) {
        setIsLoading(false);
        activeRequest.current = null;
      }
    }
  }

  function searchLocation() {
    loadWeather(searchLocationName, { addToHistory: true });
  }

  function selectRecentSearch(locationName) {
    setSearchLocationName(locationName);
    loadWeather(locationName);
  }

  function changeTemperatureUnit(unit) {
    setTemperatureUnit(unit);
    if (currentLocation) {
      loadWeather(currentLocation, {
        addToHistory: false,
        temperatureUnit: unit,
      });
    }
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      setError("Location detection is not supported by this browser.");
      return;
    }

    setIsDetectingLocation(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        let name = "Current Location";
        try {
          name = await getLocationName(coords.latitude, coords.longitude);
        } catch (geocodingError) {
          console.error("Could not determine the current location name.", geocodingError);
        }
        await loadWeather(
          {
            name,
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          { addToHistory: true },
        );
        setIsDetectingLocation(false);
      },
      (locationError) => {
        setIsDetectingLocation(false);
        setError(
          locationError.code === 1
            ? "Location permission was denied. Allow location access and try again."
            : "Unable to detect your location. Please try again.",
        );
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  }

  return (
    <main
      className={`weather-app rounded-4 p-3 p-md-4 ${dashboard?.description.bg || "bg-light"}`}
    >
      <header className="text-center mb-4">
        <h1 className="fw-bold">Weather Dashboard</h1>
        <p className="text-muted mb-0">
          Current conditions and a five-day forecast
        </p>
      </header>
      <div className="row g-4 justify-content-center">
        <RightPanel
          searchLocationName={searchLocationName}
          setSearchLocationName={setSearchLocationName}
          onSearch={searchLocation}
          onDetectLocation={detectLocation}
          onUnitChange={changeTemperatureUnit}
          temperatureUnit={temperatureUnit}
          recentSearches={recentSearches}
          onSelectRecentSearch={selectRecentSearch}
          isLoading={isLoading}
          isDetectingLocation={isDetectingLocation}
        />
        <LeftPanel dashboard={dashboard} error={error} isLoading={isLoading} />
      </div>
    </main>
  );
}

export default App;
