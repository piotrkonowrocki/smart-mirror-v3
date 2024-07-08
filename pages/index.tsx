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
        </div>
      </SettingsProvider>
    </>
  )
}

export default Home
