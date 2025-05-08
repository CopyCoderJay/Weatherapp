'use client';
import { useState } from 'react';
import { fetchCurrentWeather, fetchForecast } from 'services/weatherService';
import { WeatherData, ForecastDay } from 'types/weather';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unit] = useState<'metric' | 'imperial'>('metric');


  const search = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const isZip = /^\d{5}$/.test(query);
      const current = await fetchCurrentWeather(query, isZip,unit);
      const forecastData = await fetchForecast(query, isZip,unit);
      setWeather(current);
      setForecast(forecastData);
    } catch (e) {
        console.error('Error fetching weather:', e);
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, error, loading, search };
};

