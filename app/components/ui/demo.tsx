import React, {FC} from 'react'
import {CSSObject} from '@emotion/react'
import Image from 'next/image'

import nextJsLogo from '@/app/assets/nextjs-logo.svg'
import {theme} from '@/app/styles/theme'
import {rgba} from '@/app/utils/rgba'

const containerStyles: CSSObject = {
  maxWidth: 640,
  margin: '0 auto',
  padding: '0 20px',
}

export const DemoHeader: FC = () => (
  <div css={[containerStyles, {paddingTop: 64, paddingBottom: 48, textAlign: 'center'}]}>
    <Image src={nextJsLogo} alt="Next.js logo" />
    <h1 css={{margin: '32px 0 0', fontSize: '3rem'}}>
      Welcome to{' '}
      <a href="https://nextjs.org" target="_blank" rel="noreferrer">
        Next.js!
      </a>
    </h1>
  </div>
)

export const DemoContent: FC = () => (
  <div css={[containerStyles, {code: {padding: 2, backgroundColor: rgba(theme.color.primary, 0.15), borderRadius: 2}}]}>
    <p>
      Get started by editing <code>/pages/index.tsx</code>
    </p>
    <p>
      Start developing your own website with deleting files associated with demo component in <code>/app/components/ui/demo/</code>{' '}
      directory.
    </p>
    <p>
      Visit projects{' '}
      <a href="https://github.com/piotrkonowrocki/next-starter-template" target="_blank" rel="noreferrer">
        Github page
      </a>{' '}
      to find out more about this template.
    </p>
    <p>
      To learn more about{' '}
      <a href="https://nextjs.org" target="_blank" rel="noreferrer">
        Next.js
      </a>
      , take a look at the following resources:
    </p>
    <ul>
      <li>
        <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer">
          Next.js Documentation
        </a>{' '}
        - learn about Next.js features and API.
      </li>
      <li>
        <a href="https://nextjs.org/learn" target="_blank" rel="noreferrer">
          Learn Next.js
        </a>{' '}
        - an interactive Next.js tutorial.
      </li>
    </ul>
  </div>
)

export const DemoFooter: FC = () => (
  <div css={[containerStyles, {marginTop: 64, paddingTop: 32, textAlign: 'center', borderTop: `1px solid ${theme.color.primary}`}]}>
    <p css={{margin: 0, fontSize: '0.75rem'}}>
      {process.env.NEXT_PUBLIC_APP_AUTHOR_NAME} &bull; {process.env.NEXT_PUBLIC_APP_NAME} v.{process.env.NEXT_PUBLIC_APP_VERSION} &bull;
      2021 - {new Date().getFullYear()}
    </p>
  </div>
)
