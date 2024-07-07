interface INestedRecord<T> {
  [key: string]: T | INestedRecord<T>
}

const getNestedValue = (locale: INestedRecord<string>, path: string): string => {
  const [k, i, ...rest] = path.split('.')

  if (i) return getNestedValue(locale[k] as INestedRecord<string>, [i, ...rest].join('.'))
  else if (locale[k]) return locale[k] as string
  else throw new Error(`Unable to reach nested translation of key: "${k}"`)
}

export const useLocale = (locale: INestedRecord<string>, lang: string) => {
  const t = (path: string, _lang = lang): string => {
    try {
      return getNestedValue(locale, `${_lang}.${path}`)
    } catch (err) {
      return _lang !== 'en' ? t(path, 'en') : path
    }
  }

  return {t}
}
