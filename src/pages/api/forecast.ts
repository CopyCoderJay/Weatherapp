// pages/api/forecast.ts
import { ForecastDay } from '@/types/weather';
import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory cache (valid for 5 minutes)
const cache: Record<string, { data: ForecastDay; timestamp: number }> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city, zip, lat,lon,  unit = 'M' } = req.query;

  let queryParam = '';
  let cacheKey = '';

  if (lat && lon) {
    queryParam = `lat=${lat}&lon=${lon}`;
    cacheKey = `coords-${lat}-${lon}-${unit}`;
  } else if (zip) {
    queryParam = `postal_code=${zip}&country=IN`;
    cacheKey = `zip-${zip}-${unit}`;
  } else if (city) {
    queryParam = `city=${city}&country=IN`;
    cacheKey = `city-${city}-${unit}`;
  } else {
    return res.status(400).json({ error: 'Missing city, zip, or coordinates' });
  }


  // Return cached data if it's still valid
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < 5 * 60 * 1000) {
    return res.status(200).json(cached.data);
  }

  try {
    const response = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?${queryParam}&country=IN&days=5&units=${unit}&key=${process.env.WEATHER_API_KEY}`
    );
    const result = await response.json();

    const formattedData = result.data.map((day: ForecastDay) => ({
      datetime: day.datetime,
      max_temp: day.max_temp,
      min_temp: day.min_temp,
      weather: {
        description: day.weather.description,
        icon: `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`,
      },
    }));

    // Store in cache
    cache[cacheKey] = {
      data: formattedData,
      timestamp: Date.now(),
    };

    return res.status(200).json(formattedData);
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Failed to fetch forecast' });
  }
}
