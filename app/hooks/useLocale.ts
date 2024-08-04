interface INestedRecord<T> {
  [key: string]: T | INestedRecord<T>
}

const getNestedValue = (locale: INestedRecord<string>, path: string, variables: {[key: string]: string}): string => {
  const [k, i, ...rest] = path.split('.')

  if (i) return getNestedValue(locale[k] as INestedRecord<string>, [i, ...rest].join('.'), variables)
  else if (locale[k]) {
    const translation = locale[k] as string

    return Object.entries(variables).reduce<string>((total, [key, value]) => total.replace(`{{${key}}}`, value), translation)
  } else throw new Error(`Unable to reach nested translation of key: "${k}"`)
}

export const useLocale = (locale: INestedRecord<string>, lang: string) => {
  const t = (path: string, variables: {[key: string]: string} = {}, _lang = lang): string => {
    try {
      return getNestedValue(locale, `${_lang}.${path}`, variables)
    } catch (err) {
      return _lang !== 'en' ? t(path, variables, 'en') : path
    }
  }

  return {t}
}
