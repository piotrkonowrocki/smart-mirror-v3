export type TWidgetForecastUnits = 'imperial' | 'metric'

export interface IWidgetForecastCredentials {
  appId: string
}

export interface IWidgetForecastSettings {
  coords: [number, number]
  days: number
  units: TWidgetForecastUnits
}

export type IWidgetForecastResponse = [
  {
    base: 'string'
    clouds: {
      all: number
    }
    cod: number
    coord: {
      lat: number
      lon: number
    }
    dt: number
    id: number
    main: {
      feelsLike: number
      humidity: number
      pressure: number
      tempMax: number
      tempMin: number
      temp: number
    }
    name: string
    sys: {
      country: string
      id: number
      sunrise: number
      sunset: number
      type: number
    }
    timezone: number
    visibility: number
    weather: {
      description: string
      icon: string
      id: number
      main: string
    }[]
    wind: {
      deg: number
      speed: number
    }
  },
  {
    cod: number
    city: {
      coord: {
        lon: number
        lat: number
      }
      country: string
      id: number
      name: string
      population: number
      timezone: number
    }
    cnt: number
    list: {
      clouds: number
      deg: number
      dt: number
      feels_like: {
        day: number
        eve: number
        morn: number
        night: number
      }
      gust: number
      humidity: number
      pop: number
      pressure: number
      speed: number
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
      weather: {
        description: string
        icon: string
        id: number
        main: string
      }[]
    }[]
    message: number
  },
]
