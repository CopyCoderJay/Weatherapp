export interface WeatherData {
    datetime: string;
    city_name: string;
    temp: number;
    weather: {
      description: string;
      icon: string;
    };
  }

  export interface imakeerr {
    response: {
        status: number;
    };
  }
  
  export interface ForecastDay {
    datetime: string;
    max_temp: number;
    min_temp: number;
    weather: {
      description: string;
      icon: string; // Now it's a full URL string
    };
  }