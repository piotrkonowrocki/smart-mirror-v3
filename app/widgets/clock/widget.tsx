import {FC, Fragment} from 'react'
import dayjs from 'dayjs'

import {Widget} from '@/app/components/widget'
import {useSettings} from '@/app/context'
import {theme} from '@/app/styles'
import {TWidgetInterface} from '@/app/types/settings'
import {IWidgetClockResponse, IWidgetClockSettings} from '@/app/widgets/clock'

export const WidgetClock: FC<TWidgetInterface<IWidgetClockSettings>> = ({settings: {format}}) => {
  const {lang} = useSettings()

  return (
    <Widget<IWidgetClockResponse>
      name="clock"
      callback={() => ({timestamp: new Date().getTime()})}
      queryKey={[new Date().getTime()]}
      refresh={1000}
      request={[]}
    >
      {([{timestamp}]) => {
        return (
          <>
            <p css={{position: 'relative', fontSize: theme.font.size.heading}}>
              {dayjs(timestamp).format(`${format === '24' ? 'HH' : 'h'}:mm`)}
              <span css={{position: 'relative', top: `-${theme.spacing.l}`, color: theme.color.faded, fontSize: '50%'}}>
                {dayjs(timestamp).format(` ss`)}
              </span>
            </p>
            <p css={{'&:first-letter': {textTransform: 'capitalize'}}}>
              {new Intl.DateTimeFormat(lang, {dateStyle: 'full'}).format(timestamp)}
            </p>
          </>
        )
      }}
    </Widget>
  )
}
