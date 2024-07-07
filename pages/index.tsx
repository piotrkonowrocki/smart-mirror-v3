import React from 'react'
import settings from '@settings'
import {NextPage} from 'next'
import Head from 'next/head'

import {Region} from '@/app/components/region'
import {SettingsProvider} from '@/app/context'
import {siteName} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

const Home: NextPage = () => {
  const title = `${siteName} v${process.env.NEXT_PUBLIC_APP_VERSION}`

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SettingsProvider lang={settings.lang}>
        <div css={{display: 'grid', gap: theme.spacing.xl, gridTemplateColumns: '1fr 1fr', height: '100%', padding: theme.spacing.xl}}>
          <Region position={['left', 'top']} widgets={settings.widgets} />
          <Region position={['right', 'top']} widgets={settings.widgets} />
          <Region position={['left', 'bottom']} widgets={settings.widgets} />
          <Region position={['right', 'bottom']} widgets={settings.widgets} />
          {/* <div className="region-top region-left" css={{...widgetCss, justifySelf: 'start'}}>
            <WidgetClock format="24" />
            <WidgetCalendar
              calendars={[
                {
                  id: 'kadt3p8qroofhnepssoi6bd0g4@group.calendar.google.com',
                },
                {
                  id: 'p.konowrocki@gmail.com',
                  label: 'Piotr',
                },
                {
                  id: 'mily.dzien@gmail.com',
                  label: 'Magda',
                },
                {
                  id: 'pl.polish%23holiday%40group.v.calendar.google.com',
                },
              ]}
              clientId="481471314677-7f9j3s2mnvsli2s1755nqjcnko62s7gb.apps.googleusercontent.com"
              clientSecret="Z4CIOf_NArUb4jJO4mSM4Lf9"
            />
          </div>
          <div className="region-top region-right" css={{...widgetCss, justifySelf: 'end'}}>
            <WidgetForecast days={5} appId="7c80632efdc8a9a1617bb03b8f42e881" coords={[52.237049, 21.017532]} units="metric" />
          </div> */}
        </div>
      </SettingsProvider>
    </>
  )
}

export default Home
