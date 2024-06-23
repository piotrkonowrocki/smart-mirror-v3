import {TWidgetForecastUnits} from '@/app/widgets/forecast'

export const getFormattedWindSpeed = (windSpeed: number, units: TWidgetForecastUnits) => {
  return `${units === 'metric' ? `${(windSpeed * 3.6).toFixed(1)} km/h` : `${windSpeed.toFixed(1)} mph`}`
}
