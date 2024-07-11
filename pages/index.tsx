import React, {useEffect} from 'react'
import {Global} from '@emotion/react'
import {useQueryClient} from '@tanstack/react-query'
import {NextPage} from 'next'
import Head from 'next/head'
import schedule from 'node-schedule'

import {Region} from '@/app/components/region'
import {Toast} from '@/app/components/toast'
import {useSettings} from '@/app/context'
import {siteName} from '@/app/dictionaries/site.dictionary'
import {theme} from '@/app/styles'

const Home: NextPage = () => {
  const queryClient = useQueryClient()
  const {font, scale} = useSettings()
  const title = `${siteName} v${process.env.NEXT_PUBLIC_APP_VERSION}`

  useEffect(() => {
    schedule.scheduleJob('0 * * *', () => queryClient.refetchQueries())
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={{html: {fontFamily: theme.font.family[font], fontSize: `${scale}px`}}} />
      <Toast />
      <div css={{display: 'grid', gap: theme.spacing.xl, gridTemplateColumns: '1fr 1fr', height: '100%', padding: theme.spacing.xl}}>
        <Region position={['left', 'top']} />
        <Region position={['right', 'top']} />
        <Region position={['left', 'bottom']} />
        <Region position={['right', 'bottom']} />
      </div>
    </>
  )
}

export default Home
