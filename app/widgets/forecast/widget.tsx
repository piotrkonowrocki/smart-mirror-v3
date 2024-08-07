import {FC, Fragment} from 'react'
import {IconArrowDown, IconDashboard, IconDropletOff, IconSunrise, IconSunset, IconWind} from '@tabler/icons-react'
import dayjs from 'dayjs'

import {Widget} from '@/app/components/widget'
import {useSettings} from '@/app/context'
import {useLocale} from '@/app/hooks'
import {theme} from '@/app/styles'
import {TWidgetInterface} from '@/app/types/settings'
import {
  getAlertIcon,
  getChartCoords,
  getFormattedTemperature,
  getFormattedWindSpeed,
  getUniqueAlerts,
  getWeatherIconPath,
  IWidgetForecastCredentials,
  IWidgetForecastResponse,
  IWidgetForecastSettings,
} from '@/app/widgets/forecast'

import * as locale from './locale.json'

const chartPercentToRemRatio = 0.5
const chartCanvasWidth = 320
const chartPointRadius = 3
const chartStrokeWidth = 2
const chartInternalOffset = chartPointRadius + chartStrokeWidth / 2

export const WidgetForecast: FC<TWidgetInterface<IWidgetForecastSettings, IWidgetForecastCredentials>> = ({
  credentials: {appId},
  settings: {
    coords: [lat, lon],
    days,
    units,
  },
}) => {
  const {lang} = useSettings()
  const {t} = useLocale(locale, lang)

  return (
    <Widget<IWidgetForecastResponse>
      name="forecast"
      queryKey={[lat, lon]}
      request={[
        {
          url: 'https://api.openweathermap.org/data/3.0/onecall',
          params: {appId, exclude: 'minutely', lat, lon, lang, units},
        },
      ]}
    >
      {([
        {
          alerts,
          current: {
            pressure,
            sunrise,
            sunset,
            temp,
            weather: [{description, icon}],
            windDeg,
            windSpeed,
          },
          daily,
          hourly,
        },
      ]) => {
        const daysListModifier = Number(dayjs().format('HH')) > 12 ? 1 : 0
        const popList = hourly.map(({pop}) => Math.round(pop * 100)).slice(0, 12)
        const maxPop = Math.max(...popList)
        const {events, providers} = getUniqueAlerts(alerts)

        let filledHourCounter = 1

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
            <p css={{marginBottom: theme.spacing.xs, color: theme.color.faded}}>{description}</p>
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
                <IconWind size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} /> {getFormattedWindSpeed(windSpeed, units)}
                <IconArrowDown size={theme.icon.size.sub} css={{transform: `rotate(${windDeg}deg)`, ...theme.icon.composition.sub}} />
              </li>
              <li>•</li>
              <li>
                <IconDashboard size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} /> {pressure} hPa
              </li>
              <li>•</li>
              <li>
                <IconSunrise size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} /> {dayjs(sunrise * 1000).format('HH:mm')}
              </li>
              <li>•</li>
              <li>
                <IconSunset size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} /> {dayjs(sunset * 1000).format('HH:mm')}
              </li>
            </ul>
            {events.length > 0 && (
              <>
                <p css={{marginTop: theme.spacing.xs, color: theme.color.faded, fontSize: theme.font.size.sub}}>
                  {t(providers.length > 0 ? 'current-alerts-with-providers' : 'current-alerts-wo-providers', {
                    providers: providers.join(', '),
                  })}
                  :
                </p>
                <ul
                  css={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    columnGap: theme.spacing.xs,
                    margin: `${theme.spacing.xxs} 0 0`,
                    padding: 0,
                    listStyle: 'none',
                    fontSize: theme.font.size.sub,
                  }}
                >
                  {events.map((event, i) => {
                    const Icon = getAlertIcon(event)

                    return (
                      <Fragment key={i}>
                        {i > 0 && <li css={{color: theme.color.faded}}>•</li>}
                        <li>
                          <Icon size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} />{' '}
                          {t(`alerts.${event.replace(/ /gu, '-')}`)}
                        </li>
                      </Fragment>
                    )
                  })}
                </ul>
              </>
            )}
            {maxPop >= 10 && (
              <>
                <div css={{display: 'flex', columnGap: theme.spacing.s, marginTop: theme.spacing.xl}}>
                  <ul
                    css={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      margin: '-3rem 0 -5rem',
                      padding: 0,
                      listStyle: 'none',
                      fontSize: theme.font.size.sub,
                      color: theme.color.faded,
                      flexShrink: 0,
                    }}
                  >
                    <li>{maxPop}%</li>
                    {maxPop >= 40 && (
                      <li>
                        <IconDropletOff size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} />
                      </li>
                    )}
                  </ul>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    css={{
                      display: 'block',
                      width: `${chartCanvasWidth + chartInternalOffset * 2}rem`,
                      height: `${maxPop * chartPercentToRemRatio + chartInternalOffset * 2}rem`,
                    }}
                  >
                    <line
                      x1={`${0}rem`}
                      y1={`${chartInternalOffset}rem`}
                      x2={`${chartCanvasWidth + chartInternalOffset * 2}rem`}
                      y2={`${chartInternalOffset}rem`}
                      stroke={theme.color.faded}
                      strokeWidth={`${chartStrokeWidth}rem`}
                      strokeDasharray="4rem"
                    />
                    <line
                      x1={`${0}rem`}
                      y1={`${maxPop * chartPercentToRemRatio + chartInternalOffset}rem`}
                      x2={`${chartCanvasWidth + chartInternalOffset * 2}rem`}
                      y2={`${maxPop * chartPercentToRemRatio + chartInternalOffset}rem`}
                      stroke={theme.color.faded}
                      strokeWidth={`${chartStrokeWidth}rem`}
                      strokeDasharray="4rem"
                    />
                    {popList.map((pop, i, items) => {
                      const {x1, x2, y1, y2} = getChartCoords({
                        chartCanvasWidth,
                        chartInternalOffset,
                        chartPercentToRemRatio,
                        currentPop: pop,
                        i,
                        maxPop,
                        size: items.length,
                        nextPop: items[i + 1],
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
                <ul
                  css={{
                    display: 'grid',
                    gridTemplateColumns: `minmax(0, 0.5fr) repeat(${popList.length - 2}, minmax(0, 1fr)) minmax(0, 0.5fr)`,
                    justifyItems: 'center',
                    width: `${chartCanvasWidth}rem`,
                    margin: `${theme.spacing.xs} ${chartInternalOffset}rem ${theme.spacing.xl}`,
                    padding: 0,
                    listStyle: 'none',
                    fontSize: theme.font.size.small,
                    color: theme.color.faded,
                  }}
                >
                  {popList.map((pop, i, items) => {
                    const shouldShowHour =
                      filledHourCounter <= 0 &&
                      ((items[i - 1] > 0 && pop <= 10) || (items[i - 1] === 0 && pop > 0) || Math.abs(items[i - 1] - pop) > 40)

                    if (shouldShowHour) filledHourCounter = 2
                    else filledHourCounter--

                    return (
                      <li key={i} css={{'&:first-of-type': {justifySelf: 'start'}, '&:last-of-type': {justifySelf: 'end'}}}>
                        {shouldShowHour && dayjs().add(i, 'hours').format('HH:00')}
                      </li>
                    )
                  })}
                </ul>
              </>
            )}
            <div
              css={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, auto)',
                alignItems: 'center',
                rowGap: theme.spacing.xs,
                columnGap: theme.spacing.s,
                marginTop: maxPop < 10 ? theme.spacing.l : 0,
                fontSize: theme.font.size.sub,
              }}
            >
              {daily
                .slice(daysListModifier, days + daysListModifier)
                .map(({dt, windSpeed: _windSpeed, temp: {day, night}, weather: [{icon: _icon}]}, i) => (
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
                    <span css={{textAlign: 'left'}}>{getFormattedTemperature(day, units)}</span>
                    <span css={{color: theme.color.faded, textAlign: 'left'}}>{getFormattedTemperature(night, units)}</span>
                    <span css={{color: theme.color.faded, textAlign: 'left'}}>
                      <IconWind size={theme.icon.size.sub} css={{...theme.icon.composition.sub}} />{' '}
                      {getFormattedWindSpeed(_windSpeed, units)}
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
