export const removeOrphans = (text: string): string => {
  return text.replace(/\s([^\s<]+)\s*$/gu, '\u00A0$1')
}
