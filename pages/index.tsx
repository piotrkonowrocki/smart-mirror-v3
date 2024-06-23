import React from 'react'
import {Interpolation, Theme} from '@emotion/react'
import {WidgetClock, WidgetForecast} from '@widgets'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import {NextPage} from 'next'
import Head from 'next/head'

import {SettingsProvider} from '@/app/context'
import {siteName} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

const widgetCss: Interpolation<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.xl,
}

const Home: NextPage = () => {
  const title = `${siteName} v${process.env.NEXT_PUBLIC_APP_VERSION}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SettingsProvider lang="pl">
        <div css={{display: 'grid', gap: theme.spacing.xl, gridTemplateColumns: '1fr 1fr', height: '100%', padding: theme.spacing.xl}}>
          <div className="region-top region-left" css={{...widgetCss, justifySelf: 'start'}}>
            <WidgetClock format="24" />
          </div>
          <div className="region-top region-right" css={{...widgetCss, justifySelf: 'end'}}>
            <WidgetForecast days={5} appId="7c80632efdc8a9a1617bb03b8f42e881" coords={[52.237049, 21.017532]} units="metric" />
          </div>
        </div>
      </SettingsProvider>
    </>
  )
}

export default Home
