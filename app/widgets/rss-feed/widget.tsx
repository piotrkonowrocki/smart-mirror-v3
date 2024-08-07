import {FC} from 'react'

import {Widget} from '@/app/components/widget'
import {TWidgetInterface} from '@/app/types/settings'
import {Carousel, IWidgetRssFeedResponse, IWidgetRssFeedSettings} from '@/app/widgets/rss-feed'

export const WidgetRssFeed: FC<TWidgetInterface<IWidgetRssFeedSettings>> = ({settings: {feeds, maxItems}}) => {
  return (
    <Widget<IWidgetRssFeedResponse>
      name="rss-feed"
      queryKey={feeds}
      request={feeds.map((feed) => ({
        url: feed,
        method: 'rss',
      }))}
    >
      {(list) => {
        const items = list
          .flatMap((item) => item.items)
          .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
          .slice(0, maxItems)

        return <Carousel items={items} />
      }}
    </Widget>
  )
}
