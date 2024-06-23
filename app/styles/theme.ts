/* eslint-disable new-cap */
import facepaint from 'facepaint'
import {Lato, Nunito, Poppins, Roboto, Rubik} from 'next/font/google'

/*
  Colors naming convetion:

  Every color (except default black and white) variable name should consist of two parts:
  1. approximate main color name, try keeping main names to minimum
    and base them on e.g. basic color wheel: yellow, orange, red, violet, blue and green
  2. detailed color name based on https://chir.ag/projects/name-that-color or similar service.

  Examples:
  #af4d43 => colors.redAppleBlossom
  #f1e788 => colors.yellowSaharaSand

  If detailed name already includes main color name, drop it.

  Examples:
  #ffa000 => orange peel => colors.orangePeel, not colors.orangeOrangePeel
  #1c39bb => persian blue => colors.bluePersian, not colors.bluePersianBlue

  Do not to use color variables directly in css in js code, instead assign them to theme in more descriptive variables.

  Examples:
  theme.colors.primary: colors.greenPistachio
  theme.colors.border: colors.greyPaleOyster
*/

const colors = {
  black: '#000',
  grey: '#808080',
  white: '#fff',
}

const fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const nunito = Nunito({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})
const rubik = Rubik({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export const theme = {
  breakpoints: [768],
  color: {
    background: colors.black,
    faded: colors.grey,
    foreground: colors.white,
  },
  spacing: {
    xs: '4rem',
    s: '8rem',
    m: '12rem',
    l: '16rem',
    xl: '24rem',
  },
  font: {
    size: {
      heading: '48rem',
      base: '18rem',
      sub: '14rem',
    },
    family: {
      lato: `${lato.style.fontFamily}, ${fontFamily}`,
      nunito: `${nunito.style.fontFamily}, ${fontFamily}`,
      poppins: `${poppins.style.fontFamily}, ${fontFamily}`,
      roboto: `${roboto.style.fontFamily}, ${fontFamily}`,
      rubik: `${rubik.style.fontFamily}, ${fontFamily}`,
    },
    spacing: {
      base: 1.2,
    },
  },
  icon: {
    size: {
      sub: '18rem',
    },
    composition: {
      sub: {
        marginTop: '-2rem',
      },
    },
  },
}

export const mediaQuery = facepaint(theme.breakpoints.map((breakpoint) => `@media (min-width: ${breakpoint}px)`))
