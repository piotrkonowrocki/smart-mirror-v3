import {FC} from 'react'

import {TWidgetRegionX, TWidgetRegionY} from '@/app/components/region/types'
import {theme} from '@/app/styles'
import {IWidget} from '@/app/types/settings'
import {WidgetCalendar, WidgetClock, WidgetForecast} from '@/app/widgets'

interface IRegionProps {
  position: [TWidgetRegionX, TWidgetRegionY]
  widgets: IWidget[]
}

export const Region: FC<IRegionProps> = ({position: [x, y], widgets}) => {
  return (
    <div
      className={`region-${x} region-${y}`}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: y === 'top' ? 'start' : 'end',
        justifySelf: x === 'left' ? 'start' : 'end',
        gap: theme.spacing.xl,
        maxWidth: '360rem',
      }}
    >
      {widgets
        .filter(({region: [widgetX, widgetY]}) => widgetX === x && widgetY === y)
        .map((widget, i) => {
          switch (widget.name) {
            case 'calendar':
              return <WidgetCalendar key={i} {...widget} />
            case 'clock':
              return <WidgetClock key={i} {...widget} />
            case 'forecast':
              return <WidgetForecast key={i} {...widget} />
            default:
              return 'Unsupported widget type'
          }
        })}
    </div>
  )
}
