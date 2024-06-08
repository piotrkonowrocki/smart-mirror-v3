import hexRgb from 'hex-rgb'

export const rgba = (hex: string, opacity: number): string => {
  const {red, green, blue} = hexRgb(hex)

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}
