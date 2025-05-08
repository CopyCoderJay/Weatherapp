'use client';

import { useState, useEffect, useCallback } from 'react';

import WeatherCard from '@/components/WeatherCard';
import ForecastList from '@/components/ForecastList';
import ErrorMessage from '@/components/ErrorMessage';
import {
  fetchCurrentWeather,
  fetchForecast,
  fetchCurrentLocationWeather,
  fetchCurrentLocationForecast,
} from '@/services/weatherService';
import { ForecastDay, WeatherData } from '@/types/weather';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [error, setError] = useState<string | null>(null);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);
  const [newCity, setNewCity] = useState('');

  const getWeatherData = useCallback(async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const isZip = /^\d+$/.test(city.trim());
      const current = await fetchCurrentWeather(city, isZip, unit);
      const forecastData = await fetchForecast(city, isZip, unit);
      setWeather(current);
      setForecast(forecastData);
    } catch (err) {
      console.error(err);
      setWeather(null);
      setForecast([]);
      setError(navigator.onLine ? 'Something went wrong.' : 'No internet connection.');
    } finally {
      setLoading(false);
    }
  }, [unit]);

  const fetchByLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const current = await fetchCurrentLocationWeather(latitude, longitude, unit);
          const forecastData = await fetchCurrentLocationForecast(latitude, longitude, unit);
          setWeather(current);
          setForecast(forecastData);
          setNewCity(current.city_name); // 👈 Add this line
          setError(null);
        } catch {
          setError('Failed to fetch data for your location.');
        }
      },
      () => setError('Failed to get your location.')
    );
  };

  const addFavoriteCity = () => {
    if (newCity.trim() && !favoriteCities.includes(newCity) && favoriteCities.length < 3) {
      setFavoriteCities([...favoriteCities, newCity.trim()]);
      setNewCity('');
    }
  };

  const removeFavoriteCity = (city: string) => {
    setFavoriteCities(favoriteCities.filter((c) => c !== city));
  };

  useEffect(() => {
    getWeatherData("Coimbatore");
  }, []); // Only run once

  useEffect(() => {
    const handleOffline = () =>
      setError('You are offline. Please check your internet connection.');
    const handleOnline = () => setError(null);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
  
        {/* Combined Search and Add Favorite */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold dark:text-white">Search City & Add to Favorites</h2>
  
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
                placeholder="Enter city"
                className="border px-3 py-2 rounded-md w-full sm:w-64 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => getWeatherData(newCity)}
                  disabled={!newCity.trim()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition hover:bg-blue-600"
                >
                  Search
                </button>
                <button
                  onClick={addFavoriteCity}
                  disabled={
                    favoriteCities.length >= 3 ||
                    !newCity.trim() ||
                    favoriteCities.includes(newCity.trim())
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-md transition hover:bg-green-600 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
            </div>
  
            <button
              onClick={fetchByLocation}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition"
            >
              Use Current Location
            </button>
          </div>
  
          {/* Favorite City Chips */}
          <div className="flex flex-wrap gap-2">
            {favoriteCities.map((city) => (
              <div
                key={city}
                className="flex items-center bg-blue-100 dark:bg-gray-700 text-sm px-3 py-1 rounded-md"
              >
                <button
                  onClick={() => getWeatherData(city)}
                  className="mr-2 hover:underline text-blue-600 dark:text-blue-400"
                >
                  {city}
                </button>
                <button
                  onClick={() => removeFavoriteCity(city)}
                  className="text-red-600 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
  
        {/* Unit Toggle */}
        <div className="flex justify-end gap-0">
          <button
            className={`px-4 py-2 rounded-l-md ${
              unit === 'metric'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-100 dark:bg-gray-700 dark:text-white'
            } transition`}
            onClick={() => setUnit('metric')}
          >
            °C
          </button>
          <button
            className={`px-4 py-2 rounded-r-md ${
              unit === 'imperial'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
            } transition`}
            onClick={() => setUnit('imperial')}
          >
            °F
          </button>
        </div>
  
        {/* Error */}
        {error && (
          <div className="text-center">
            <ErrorMessage message={error} />
            <button
              onClick={() => getWeatherData('Coimbatore')}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}
  
        {/* Weather Output */}
        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
        ) : (
          <>
            {weather && <WeatherCard data={weather} unit={unit} />}
            {forecast && <ForecastList data={forecast} unit={unit} />}
          </>
        )}
      </div>
    </div>
  );
  
  
}
