export type TWidgetForecastUnits = 'imperial' | 'metric'

export interface IWidgetForecastCredentials {
  appId: string
}

export interface IWidgetForecastSettings {
  coords: [number, number]
  days: number
  units: TWidgetForecastUnits
}

export interface IWidgetForecastAlert {
  description: string
  end: number
  event: string
  senderName: string
  start: number
  tags: string[]
}

export type IWidgetForecastResponse = [
  {
    alerts?: IWidgetForecastAlert[]
    current: {
      clouds: number
      dewPoint: number
      dt: number
      feelsLike: number
      humidity: number
      pressure: number
      sunrise: number
      sunset: number
      temp: number
      uvi: number
      visibility: number
      weather: [
        {
          id: string
          main: string
          description: string
          icon: string
        },
      ]
      windDeg: number
      windSpeed: number
    }
    daily: {
      clouds: number
      dewPoint: number
      dt: number
      feelsLike: {
        day: number
        eve: number
        morn: number
        night: number
      }
      humidity: number
      moonPhase: number
      moonrise: number
      moonset: number
      pop: number
      pressure: number
      rain?: number
      snow?: number
      summary: number
      sunrise: number
      sunset: number
      temp: {
        day: number
        eve: number
        max: number
        min: number
        morn: number
        night: number
      }
      uvi: number
      weather: [
        {
          id: string
          main: string
          description: string
          icon: string
        },
      ]
      windSpeed: number
    }[]
    hourly: {
      clouds: number
      dewPoint: number
      dt: number
      feelsLike: number
      humidity: number
      pop: number
      pressure: number
      temp: number
      uvi: number
      visibility: number
      weather: [
        {
          id: string
          main: string
          description: string
          icon: string
        },
      ]
      windDeg: number
      windGust?: number
      windSpeed: number
    }[]
    lat: number
    lon: number
    timezone: string
    timezoneOffset: string
  },
]
