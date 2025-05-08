import { WeatherData } from 'types/weather';
import { formatTemp } from 'utils/helpers';
export default function WeatherCard({ data, unit }: { data: WeatherData; unit: string }) {
  return (
<div className="bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-700 dark:to-gray-900 p-6 rounded-2xl shadow-xl text-center text-gray-800 dark:text-white transition-all duration-300">
  <h2 className="text-2xl font-bold mb-2">{data.city_name}</h2>

  <div className="flex items-center justify-center gap-4 mb-4">
    <div className="text-5xl font-semibold">
      {formatTemp(data.temp, unit === 'metric' ? 'C' : 'F')}
    </div>

  </div>

  <p className="text-lg capitalize">{data.weather.description}</p>
</div>
  );
}
