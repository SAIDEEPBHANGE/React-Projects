# Weather Dashboard

A React and Vite weather dashboard with location search, current conditions,
air quality, sunrise and sunset times, and a five-day forecast.

## Run locally

```sh
npm install
npm run dev
```

Weather and air-quality data are provided by Open-Meteo. Location search and
reverse geocoding are provided by OpenStreetMap Nominatim. Location detection
requires browser permission and a secure context (HTTPS or localhost).

Recent searches are stored in the browser's local storage.
