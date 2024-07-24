import {CSSObject} from '@emotion/react'

export const base: CSSObject = {
  '::selection': {
    backgroundColor: 'transparent',
  },
  'html, body': {
    height: '100%',
  },
  body: {
    overflow: 'hidden',
  },
  '#__next': {
    height: '100%',
  },
}
