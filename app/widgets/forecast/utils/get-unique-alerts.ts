import {IWidgetForecastAlert} from '@/app/widgets/forecast'

export const getUniqueAlerts = (alerts: IWidgetForecastAlert[] = []) => {
  const uniqueAlerts = Object.entries(
    alerts.reduce<{
      [key: string]: {
        duration: number
        event: string
        provider: string
      }[]
    }>(
      (total, {event, end, senderName, start, tags: [tag]}) => ({
        ...total,
        [tag]: [
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          ...(total[tag] ?? []),
          {event, duration: end - start, provider: senderName},
        ],
      }),
      {},
    ),
  ).map(([tag, events]) => ({
    tag: tag.toLowerCase(),
    event: events.sort((a, b) => a.duration - b.duration)[0],
  }))

  return {
    events: uniqueAlerts.map(({tag}) => tag),
    providers: [...new Set(uniqueAlerts.map(({event: {provider}}) => provider))],
  }
}
