/* eslint-disable camelcase */
import {FC} from 'react'
import {IconArrowDownRight, IconArrowUpRight} from '@tabler/icons-react'
import Image from 'next/image'

import {Widget} from '@/app/components/widget'
import {theme} from '@/app/styles'
import {rgba} from '@/app/utils'
import {IWidgetRssFeedResponse, IWidgetRssFeedSettings} from '@/app/widgets/rss-feed'

interface IWidgetRssFeedProps {
  settings: IWidgetRssFeedSettings
}

export const WidgetRssFeed: FC<IWidgetRssFeedProps> = ({settings: {feeds}}) => {
  return (
    <Widget<IWidgetRssFeedResponse>
      name="rss-feed"
      queryKey={feeds}
      request={feeds.map((feed) => ({
        url: feed,
        method: 'rss',
      }))}
      transformToSnakeCase
    >
      {([tokens]) => {
        return (
          <>asd</>
        )
      }}
    </Widget>
  )
}
