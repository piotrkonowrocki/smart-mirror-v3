import {TWidgetForecastUnits} from '@/app/widgets/forecast'

export const getFormattedTemperature = (temperature: number, units: TWidgetForecastUnits) => {
  return `${temperature.toFixed(1)}°${units === 'metric' ? 'C' : 'F'}`
}
