import {CSSObject} from '@emotion/react'

// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import {theme} from './theme'

export const text: CSSObject = {
  html: {
    fontSize: 1,
  },
  body: {
    color: theme.color.foreground,
    fontSize: theme.font.size.base,
    fontFamily: theme.font.family.rubik,
    lineHeight: theme.font.spacing.base,
    backgroundColor: theme.color.background,
  },
  'h1, h2, h3, h4, h5, h6, p, ul, ol': {
    margin: 0,
  },
  'ul, ol': {
    listStyle: 'none',
    margin: 0,
  },
}
