import React, {createContext, FC, PropsWithChildren, useContext} from 'react'

interface ISettingsContextProps {
  lang: string
}

const defaults: ISettingsContextProps = {
  lang: 'en',
}

export const SettingsContext = createContext<ISettingsContextProps>(defaults)

export const SettingsProvider: FC<PropsWithChildren<ISettingsContextProps>> = ({children, ...rest}) => {
  return <SettingsContext.Provider value={rest}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)
