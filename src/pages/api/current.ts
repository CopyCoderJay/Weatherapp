import type { NextApiRequest, NextApiResponse } from 'next';
const cache: Record<string, { data: any; timestamp: number }> = {};
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
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?${queryParam}&country=IN&key=${process.env.WEATHER_API_KEY}`);
    const data = await response.json();
    res.status(200).json(data.data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
}