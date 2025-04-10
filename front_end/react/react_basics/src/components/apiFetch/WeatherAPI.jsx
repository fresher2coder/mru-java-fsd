import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "5743aa3b69150b05795f2cb862de6742"; // Replace with your real key
const CITY = "Coimbatore";

const WeatherAPI = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: CITY,
            appid: API_KEY,
            units: "metric",
          },
        }
      );
      setWeather(res.data);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Failed to fetch weather.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="app-container">
      <h1 className="main-title">🌤 Chennai Weather</h1>
      {loading ? (
        <p>Loading weather...</p>
      ) : error ? (
        <p>{error}</p>
      ) : weather ? (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <h3>{weather.weather[0].main}</h3>
          <p>🌡 Temp: {Math.round(weather.main.temp)}°C</p>
          <p>💨 Wind: {weather.wind.speed} m/s</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherAPI;
