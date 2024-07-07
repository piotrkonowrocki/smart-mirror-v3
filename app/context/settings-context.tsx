import React, {createContext, FC, PropsWithChildren, useContext} from 'react'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import isBetween from 'dayjs/plugin/isBetween'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import relativeTime from 'dayjs/plugin/relativeTime'

interface ISettingsContextProps {
  lang: string
}

const defaults: ISettingsContextProps = {
  lang: 'en',
}

dayjs.extend(calendar)
dayjs.extend(isBetween)
dayjs.extend(isToday)
dayjs.extend(isTomorrow)
dayjs.extend(relativeTime)

export const SettingsContext = createContext<ISettingsContextProps>(defaults)

export const SettingsProvider: FC<PropsWithChildren<ISettingsContextProps>> = ({children, ...rest}) => {
  import(`dayjs/locale/${rest.lang}.js`).then(() => dayjs.locale(rest.lang))

  return <SettingsContext.Provider value={rest}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
