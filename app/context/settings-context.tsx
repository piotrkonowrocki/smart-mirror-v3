import React, {createContext, FC, PropsWithChildren, useContext, useEffect, useRef} from 'react'
import {Id, toast} from 'react-toastify'
import dayjs from 'dayjs'
import locales from 'dayjs/locale.json'
import calendar from 'dayjs/plugin/calendar'
import isBetween from 'dayjs/plugin/isBetween'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import relativeTime from 'dayjs/plugin/relativeTime'
import similarity from 'similarity'

import {ISettings} from '@/app/types/settings'

type ISettingsContextProps = ISettings

const defaults: ISettingsContextProps = {
  debug: false,
  font: 'rubik',
  lang: 'en',
  scale: 1,
  widgets: [],
}

dayjs.extend(calendar)
dayjs.extend(isBetween)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(relativeTime)

export const SettingsContext = createContext<ISettingsContextProps>(defaults)

export const SettingsProvider: FC<PropsWithChildren<Partial<ISettingsContextProps>>> = ({children, ...rest}) => {
  const toastId = useRef<Id>()
  const settings = {...defaults, ...rest}

  useEffect(() => {
    toast.dismiss(toastId.current)

    if (locales.find(({key}) => key === settings.lang)) import(`dayjs/locale/${settings.lang}.js`).then(() => dayjs.locale(settings.lang))
    else {
      const similarityMap = locales
        .map(({key}) => ({key, similarity: similarity(settings.lang, key)}))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3)
        .map(({key}) => key)

      toastId.current = toast.warn(
        <>
          Error fetching loading <strong>{settings.lang}</strong> language
          <br />
          Did you mean: <strong>{similarityMap[0]}</strong>, <strong>{similarityMap[1]}</strong> or <strong>{similarityMap[2]}</strong>?
        </>,
      )
    }
  }, [settings.lang])

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
