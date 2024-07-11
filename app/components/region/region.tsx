import {FC} from 'react'

import {TWidgetRegionX, TWidgetRegionY} from '@/app/components/region/types'
import {useSettings} from '@/app/context'
import {theme} from '@/app/styles'
import {WidgetCalendar, WidgetClock, WidgetCrypto, WidgetCurrency, WidgetForecast} from '@/app/widgets'

interface IRegionProps {
  position: [TWidgetRegionX, TWidgetRegionY]
}

export const Region: FC<IRegionProps> = ({position: [x, y]}) => {
  const {widgets} = useSettings()

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
            case 'crypto':
              return <WidgetCrypto key={i} {...widget} />
            case 'currency':
              return <WidgetCurrency key={i} {...widget} />
            case 'forecast':
              return <WidgetForecast key={i} {...widget} />
            default:
              return 'Unsupported widget type'
          }
        })}
    </div>
  )
}
