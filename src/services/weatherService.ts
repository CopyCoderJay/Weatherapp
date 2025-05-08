const isServer = typeof window === 'undefined';

export const fetchCurrentWeather = async (query: string, isZip: boolean,unit:string) => {
    let urlParam = '';
    if (query.includes(',')) {
      urlParam = `coords=${query}`;
    } else {
      urlParam = isZip ? `zip=${query}` : `city=${query}`;
    }
    const res = await fetch(`/api/current?${urlParam}&units=${unit}`);
    return res.json();
  };
export const fetchForecast = async (query: string, isZip: boolean, unit: string = 'M') => {
    const param = isZip ? `zip=${query}` : `city=${query}`;
    const url = `/api/forecast?${param}&unit=${unit}`;
    const res = await fetch(url);
  
    if (!res.ok) throw new Error('Failed to fetch forecast');
    return res.json();
};

export const fetchCurrentLocationWeather = async (latitude: number,longitude: number, unit: string) => {
    let urlParam = '';
    urlParam = `lat=${latitude}&lon=${longitude}`;
    const res = await fetch(`/api/current?${urlParam}&units=${unit}`);
    return res.json();
  };

  export const fetchCurrentLocationForecast = async (latitude: number,longitude: number, unit: string) => {
    let urlParam = '';
    urlParam = `lat=${latitude}&lon=${longitude}`;
    const url = `/api/forecast?${urlParam}&unit=${unit}`;
    const res = await fetch(url);
  
    if (!res.ok) throw new Error('Failed to fetch forecast');
    return res.json();
};
