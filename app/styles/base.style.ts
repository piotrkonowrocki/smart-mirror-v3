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
    cursor: 'none',
  },
  '#__next': {
    height: '100%',
  },
}
