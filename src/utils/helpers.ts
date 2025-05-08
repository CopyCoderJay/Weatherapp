export function formatTemp(temp: number, unit: 'C' | 'F') {
    return unit === 'C'
      ? `${Math.round(temp)}°C`
      : `${Math.round((temp * 9) / 5 + 32)}°F`;
  }
  