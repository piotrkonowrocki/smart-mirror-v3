import {FC} from 'react'

import {Widget} from '@/app/components/widget'
import {useSettings} from '@/app/context'
import {useLocale} from '@/app/hooks'
import {theme} from '@/app/styles'
import {TWidgetInterface} from '@/app/types/settings'
import {IWidgetAirQualityCredentials, IWidgetAirQualityResponse, IWidgetAirQualitySettings} from '@/app/widgets/air-quality'

import * as locale from './locale.json'

const aqiPollutionRanges = [50, 100, 150, 200, 300]

export const WidgetAirQuality: FC<TWidgetInterface<IWidgetAirQualitySettings, IWidgetAirQualityCredentials>> = ({
  credentials: {token},
  settings: {
    coords: [lat, lon],
  },
}) => {
  const {lang} = useSettings()
  const {t} = useLocale(locale, lang)

  return (
    <Widget<IWidgetAirQualityResponse>
      name="air-quality"
      queryKey={[lat, lon]}
      request={[
        {
          url: `https://api.waqi.info/feed/geo:${lat};${lon}`,
          params: {
            token,
          },
        },
      ]}
    >
      {([
        {
          data: {
            aqi,
            iaqi: {pm10, pm25},
          },
        },
      ]) => {
        const aqiPollutionIndex = aqiPollutionRanges.findIndex((index) => aqi <= index)
        const aqiLevel = (aqiPollutionIndex >= 0 ? aqiPollutionIndex : aqiPollutionRanges.length) + 1

        return (
          <>
            <p>
              {t('air-quality')}: {t(`rating.${aqiLevel}`)} <span css={{color: theme.color.faded}}>{aqi}AQI</span>
            </p>
            {(pm10 || pm25) && (
              <ul
                css={{
                  display: 'flex',
                  columnGap: theme.spacing.xs,
                  margin: `${theme.spacing.xs} 0 0`,
                  padding: 0,
                  listStyle: 'none',
                  color: theme.color.faded,
                  fontSize: theme.font.size.sub,
                }}
              >
                {pm25 && <li>{pm25.v} PM2.5</li>}
                {pm10 && pm25 && <li>•</li>}
                {pm10 && <li>{pm10.v} PM10</li>}
              </ul>
            )}
          </>
        )
      }}
    </Widget>
  )
}
