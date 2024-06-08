import {CSSObject} from '@emotion/react'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

export const base: CSSObject = {
  '::selection': {
    backgroundColor: 'transparent',
    color: theme.color.foreground,
  },
  'html, body': {
    height: '100%',
  },
  body: {
    overflow: 'hidden',
    cursor: 'none',
  },
}
