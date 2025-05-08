import { ForecastDay } from 'types/weather';
import { formatTemp } from 'utils/helpers';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export default function ForecastList({ data, unit }: { data: ForecastDay[]; unit: string }) {
  const chartData = data.map((day) => ({
    name: day.datetime,
    High: unit === 'metric' ? day.max_temp : (day.max_temp * 9) / 5 + 32,
  Low: unit === 'metric' ? day.min_temp : (day.min_temp * 9) / 5 + 32,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">5-Day Forecast</h2>

      {/* Chart Section */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="High" stroke="#f87171" strokeWidth={2} />
            <Line type="monotone" dataKey="Low" stroke="#60a5fa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast Cards */}
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {data.map((day, i) => (
          <div
            key={i}
            className="p-4 bg-blue-100 dark:bg-gray-700 text-center rounded-lg w-full sm:w-1/2 md:w-1/5 shadow-lg"
          >
            <p className="text-sm font-semibold dark:text-white">{day.datetime}</p>
            <img
              src={day.weather.icon}
              alt={day.weather.description}
              className="w-16 h-16 mx-auto my-2"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300">{day.weather.description}</p>
            <p className="text-sm font-semibold dark:text-white">
              High: {formatTemp(day.max_temp, unit === 'metric' ? 'C' : 'F')}
            </p>
            <p className="text-sm font-semibold dark:text-white">
              Low: {formatTemp(day.max_temp, unit === 'metric' ? 'C' : 'F')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
