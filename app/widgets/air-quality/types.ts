export interface IWidgetAirQualityCredentials {
  token: string
}

export interface IWidgetAirQualitySettings {
  coords: [number, number]
}

type TPollutants = 'co' | 'h' | 'no3' | 'o3' | 'p' | 'pm10' | 'pm25' | 'so2' | 't' | 'w' | 'wg'

export type IWidgetAirQualityResponse = [
  {
    data: {
      aqi: number
      attributions: {
        logo: string
        name: string
        url: string
      }[]
      city: {
        geo: [number, number]
        name: string
        url: string
        location: string
      }
      debug: {
        sync: string
      }
      dominentpol: string
      forecast: {
        daily: {
          [key in TPollutants]?: {
            avg: number
            day: string
            max: number
            min: number
          }[]
        }
      }
      iaqi: {
        [key in TPollutants]?: {
          v: number
        }
      }
      idx: number
      time: {
        iso: string
        s: string
        tz: string
        v: number
      }
    }
    status: string
  },
]
