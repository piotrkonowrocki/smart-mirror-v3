import {FC, Fragment} from 'react'
import dayjs from 'dayjs'

import {Widget} from '@/app/components/widget'
import {useSettings} from '@/app/context'
import {useLocale} from '@/app/hooks'
import {theme} from '@/app/styles'
import {TWidgetInterface} from '@/app/types/settings'
import {removeOrphans} from '@/app/utils'
import {
  IWidgetCalendarCredentials,
  IWidgetCalendarPreResponse,
  IWidgetCalendarRanges,
  IWidgetCalendarResponse,
  IWidgetCalendarSettings,
  useRefreshToken,
  WidgetCalendarRange,
} from '@/app/widgets/calendar'

import * as locale from './locale.json'

export const WidgetCalendar: FC<TWidgetInterface<IWidgetCalendarSettings, IWidgetCalendarCredentials>> = ({
  credentials: {clientId, clientSecret},
  settings: {calendars},
}) => {
  const {lang} = useSettings()
  const {t} = useLocale(locale, lang)

  const refreshToken = useRefreshToken(clientId)

  return (
    <Widget<IWidgetCalendarResponse, IWidgetCalendarPreResponse>
      name="calendar"
      queryKey={[...calendars.map(({id}) => id)]}
      preRequest={{
        url: 'https://accounts.google.com/o/oauth2/token',
        method: 'post',
        params: {
          grantType: 'refresh_token',
          clientId,
          clientSecret,
          refreshToken: `${refreshToken}`,
        },
      }}
      request={({accessToken}) =>
        calendars.map(({id}) => ({
          url: `https://www.googleapis.com/calendar/v3/calendars/${id}/events`,
          params: {
            singleEvents: 'true',
            timeMin: dayjs().startOf('day').toISOString(),
            timeMax: dayjs().endOf('day').add(6, 'day').toISOString(),
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }))
      }
      enabled={Boolean(refreshToken)}
    >
      {(instances) => {
        const ranges = instances
          .flatMap(({items}) => items)
          .sort((a, b) => new Date(a.start.dateTime ?? a.start.date).getTime() - new Date(b.start.dateTime ?? b.start.date).getTime())
          .reduce<IWidgetCalendarRanges>(
            (total, current) => {
              const {
                end,
                organizer: {email},
                start,
              } = current

              const today = dayjs()
              const startDateTime = dayjs(start.dateTime ?? start.date)
              const endDateTime = dayjs(end.dateTime ?? end.date)
              const currentDay = dayjs().startOf('day').diff(startDateTime.startOf('day'), 'd') + 1
              const duration = Math.ceil(endDateTime.diff(startDateTime.startOf('day'), 'h') / 24)
              const label = calendars.find(({id}) => id === email)?.label

              const key: WidgetCalendarRange =
                today.isBetween(startDateTime, endDateTime) || startDateTime.isToday()
                  ? WidgetCalendarRange.today
                  : startDateTime.isTomorrow()
                    ? WidgetCalendarRange.tomorrow
                    : WidgetCalendarRange.upcoming

              return {
                ...total,
                [key]: [
                  ...total[key],
                  {
                    ...current,
                    currentDay,
                    duration,
                    label,
                  },
                ],
              }
            },
            {today: [], tomorrow: [], upcoming: []},
          )

        return (
          <div css={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.s}}>
            {Object.entries(ranges).map(([range, events], i) => (
              <div key={i}>
                <p>{t(range)}</p>
                <ul
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: theme.spacing.xs,
                    margin: `${theme.spacing.xs} 0 0`,
                    padding: 0,
                    listStyle: 'none',
                    fontSize: theme.font.size.sub,
                  }}
                >
                  {events.length ? (
                    events.map(({currentDay, duration, label, start, summary}, j) => {
                      const isToday = range === WidgetCalendarRange.today
                      const isUpcoming = range === WidgetCalendarRange.upcoming

                      return (
                        <li
                          key={j}
                          css={{
                            position: 'relative',
                            paddingLeft: theme.spacing.m,
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: '4rem',
                              left: 0,
                              width: '6rem',
                              height: '6rem',
                              borderRadius: '50%',
                              backgroundColor: theme.color.faded,
                            },
                          }}
                        >
                          {label && <span css={{color: theme.color.faded}}>{label}: </span>}
                          {removeOrphans(summary)}{' '}
                          <span css={{color: theme.color.faded}}>
                            {isUpcoming && <>{dayjs().to(dayjs(start.dateTime ?? start.date))} </>}
                            {start.dateTime && ((isToday && currentDay === 1) || !isToday) && (
                              <>
                                {t('at')} {dayjs(start.dateTime).format('HH:mm')}{' '}
                              </>
                            )}
                            {isToday && duration > 1 && (
                              <>
                                ({t('day')} {currentDay} {t('out-of')} {duration}){' '}
                              </>
                            )}
                            {!isToday && duration > 1 && (
                              <>
                                ({t('for')} {duration} {t('days')})
                              </>
                            )}
                          </span>
                        </li>
                      )
                    })
                  ) : (
                    <li css={{color: theme.color.faded}}>{t('no-events')}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )
      }}
    </Widget>
  )
}
