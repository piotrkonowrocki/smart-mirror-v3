import {FC, Fragment} from 'react'
import {IconArrowDown, IconDashboard, IconTemperature, IconWind} from '@tabler/icons-react'
import dayjs from 'dayjs'

import {IWidgetCommonProps, Widget} from '@/app/components/widget'
import {useSettings} from '@/app/context'
import {useLocale} from '@/app/hooks'
import {theme} from '@/app/styles'
import {
  getChartCoords,
  getFormattedTemperature,
  getFormattedWindSpeed,
  getWeatherIconPath,
  IWidgetForecastResponse,
  TWidgetForecastUnits,
} from '@/app/widgets/forecast'

import * as locale from './locale.json'

interface IWidgetForecastProps extends IWidgetCommonProps {
  appId: string
  coords: [number, number]
  days: number
  units: TWidgetForecastUnits
}

const chartTemperatureToRemRatio = 3
const chartCanvasWidth = 320
const chartPointRadius = 3
const chartStrokeWidth = 2
const chartInternalOffset = chartPointRadius + chartStrokeWidth / 2

export const WidgetForecast: FC<IWidgetForecastProps> = ({coords: [lat, lon], days, units, ...props}) => {
  const {lang} = useSettings()
  const {t} = useLocale(locale, lang)

  return (
    <Widget<IWidgetForecastResponse>
      name="forecast"
      queryKey={[lat, lon]}
      request={[
        {
          url: 'https://api.openweathermap.org/data/2.5/weather',
          params: {lat, lon, lang, units, ...props},
        },
        {
          url: 'https://api.openweathermap.org/data/2.5/forecast/daily',
          params: {cnt: 16, lat, lon, lang, units, ...props},
        },
      ]}
    >
      {([
        {
          main: {feelsLike, pressure, temp},
          weather: [{description, icon}],
          wind: {deg, speed},
        },
        {list},
      ]) => {
        const daysListModifier = Number(dayjs().format('HH')) > 12 ? 1 : 0
        const temperaturesList = list.map(({temp: {day}}) => day)
        const minTemperature = Math.min(...temperaturesList)
        const maxTemperature = Math.max(...temperaturesList)
        const absoluteTemperature = 0 - minTemperature

        return (
          <>
            <p css={{display: 'flex', alignItems: 'center', columnGap: theme.spacing.s, fontSize: theme.font.size.heading}}>
              <span css={{display: 'block', marginTop: '-80rem', marginBottom: '-80rem'}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="80rem" height="80rem">
                  <path d={getWeatherIconPath(icon)}></path>
                </svg>
              </span>
              {getFormattedTemperature(temp, units)}
            </p>
            <p css={{color: theme.color.faded}}>{description}</p>
            <ul
              css={{
                display: 'flex',
                columnGap: theme.spacing.xs,
                margin: 0,
                padding: 0,
                listStyle: 'none',
                color: theme.color.faded,
                fontSize: theme.font.size.sub,
              }}
            >
              <li>
                <IconTemperature size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} />
                {getFormattedTemperature(feelsLike, units)} {t('feels-like')}
              </li>
              <li>•</li>
              <li>
                <IconWind size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} /> {getFormattedWindSpeed(speed, units)}
                <IconArrowDown size={theme.icon.size.sub} css={{transform: `rotate(${deg}deg)`, ...theme.icon.composition.sub}} />
              </li>
              <li>•</li>
              <li>
                <IconDashboard size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} /> {pressure} hPa
              </li>
            </ul>
            <div css={{marginTop: theme.spacing.s, marginBottom: theme.spacing.s}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                css={{
                  display: 'block',
                  width: `${chartCanvasWidth + chartInternalOffset * 2}rem`,
                  height: `${(maxTemperature + absoluteTemperature) * chartTemperatureToRemRatio + chartInternalOffset * 2}rem`,
                }}
              >
                {list.map(({temp: {day}}, i, items) => {
                  const {x1, x2, y1, y2} = getChartCoords({
                    absoluteTemperature,
                    chartCanvasWidth,
                    chartInternalOffset,
                    chartTemperatureToRemRatio,
                    currentTemperature: day,
                    i,
                    maxTemperature,
                    size: items.length,
                    nextTemperature: items[i + 1]?.temp.day,
                  })

                  return (
                    <Fragment key={i}>
                      {i + 1 < items.length && (
                        <line
                          x1={`${x1}rem`}
                          y1={`${y1}rem`}
                          x2={`${x2}rem`}
                          y2={`${y2}rem`}
                          stroke={theme.color.foreground}
                          strokeWidth={`${chartStrokeWidth}rem`}
                        />
                      )}
                      <circle
                        cx={`${x1}rem`}
                        cy={`${y1}rem`}
                        r={`${chartPointRadius}rem`}
                        fill={theme.color.background}
                        stroke={theme.color.foreground}
                        strokeWidth={`${chartStrokeWidth}rem`}
                      />
                    </Fragment>
                  )
                })}
              </svg>
            </div>
            <div
              css={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, auto)',
                alignItems: 'center',
                rowGap: theme.spacing.xs,
                columnGap: theme.spacing.s,
                fontSize: theme.font.size.sub,
              }}
            >
              {list
                .slice(daysListModifier, days + daysListModifier)
                .map(({dt, speed: _speed, temp: {day, night}, weather: [{icon: _icon}]}, i) => (
                  <Fragment key={i}>
                    <span css={{textTransform: 'capitalize', textAlign: 'right'}}>
                      {dayjs(dt * 1000).isToday()
                        ? t('today')
                        : dayjs(dt * 1000).isTomorrow()
                          ? t('tomorrow')
                          : new Intl.DateTimeFormat(lang, {weekday: 'long'}).format(dt * 1000)}
                    </span>
                    <span css={{display: 'block', marginTop: '-24rem', marginBottom: '-24rem'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24rem" height="24rem">
                        <path d={getWeatherIconPath(_icon)}></path>
                      </svg>
                    </span>
                    <span>{getFormattedTemperature(day, units)}</span>
                    <span css={{color: theme.color.faded}}>{getFormattedTemperature(night, units)}</span>
                    <span css={{color: theme.color.faded}}>
                      <IconWind size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} />
                      {getFormattedWindSpeed(_speed, units)}
                    </span>
                  </Fragment>
                ))}
            </div>
          </>
        )
      }}
    </Widget>
  )
}
