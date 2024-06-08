import facepaint from 'facepaint'

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
  white: '#fff',
  redCamelot: '#893456',
}
const base = 16

export const theme = {
  breakpoints: [576, 768, 992, 1288],
  color: {
    black: colors.black,
    white: colors.white,
    primary: colors.redCamelot,
    text: colors.black,
  },
  font: {
    size: {
      base,
    },
    family: {
      sansSerif: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    },
    spacing: {
      base: 1.4,
    },
  },
}

export const mediaQuery = facepaint(theme.breakpoints.map((breakpoint) => `@media (min-width: ${breakpoint}px)`))
