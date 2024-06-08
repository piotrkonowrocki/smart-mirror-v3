import React, {FC, PropsWithChildren} from 'react'
import {CSSObject, Global} from '@emotion/react'
import Head from 'next/head'

import {DefaultTemplate, EmptyTemplate} from '@/app/components/masterpages/templates'
import {siteDescription, siteName} from '@/app/dictionaries/site.dictionary'

interface IMasterPageProps {
  bodyCss?: CSSObject
  description?: string
  subtitle?: string | string[]
  template?: 'default' | 'empty'
  title?: string
}

const MasterPage: FC<PropsWithChildren<IMasterPageProps>> = ({
  bodyCss,
  description = siteDescription,
  children,
  subtitle,
  template = 'default',
  title = siteName,
}) => {
  return (
    <>
      <Head>
        <title>{[...(subtitle ? [subtitle] : []), title].flat().join(' - ')}</title>
        <meta name="description" content={description} key="meta-description" />
        <link rel="icon" href="/favicon.ico" />
        {/* Generate your complete favicon using https://realfavicongenerator.net/ */}
      </Head>
      <Global styles={{body: bodyCss}} />
      {
        {
          default: <DefaultTemplate>{children}</DefaultTemplate>,
          empty: <EmptyTemplate>{children}</EmptyTemplate>,
        }[template]
      }
    </>
  )
}

export default MasterPage
