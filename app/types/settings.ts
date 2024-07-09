import {TWidgetRegionX, TWidgetRegionY} from '@/app/components/region'
import {IWidgetCalendarCredentials, IWidgetCalendarSettings} from '@/app/widgets/calendar'
import {IWidgetClockSettings} from '@/app/widgets/clock'
import {IWidgetCryptoCredentials, IWidgetCryptoSettings} from '@/app/widgets/crypto'
import {IWidgetCurrencyCredentials, IWidgetCurrencySettings} from '@/app/widgets/currency'
import {IWidgetForecastCredentials, IWidgetForecastSettings} from '@/app/widgets/forecast'

interface IWidgetCommons {
  region: [TWidgetRegionX, TWidgetRegionY]
}

interface IWidgetCalendar extends IWidgetCommons {
  name: 'calendar'
  credentials: IWidgetCalendarCredentials
  settings: IWidgetCalendarSettings
}
interface IWidgetClock extends IWidgetCommons {
  name: 'clock'
  settings: IWidgetClockSettings
}
interface IWidgetCrypto extends IWidgetCommons {
  name: 'crypto'
  credentials: IWidgetCryptoCredentials
  settings: IWidgetCryptoSettings
}
interface IWidgetCurrency extends IWidgetCommons {
  name: 'currency'
  credentials: IWidgetCurrencyCredentials
  settings: IWidgetCurrencySettings
}
interface IWidgetForecast extends IWidgetCommons {
  name: 'forecast'
  credentials: IWidgetForecastCredentials
  settings: IWidgetForecastSettings
}

export type IWidget = IWidgetCalendar | IWidgetClock | IWidgetCrypto | IWidgetCurrency | IWidgetForecast

export interface ISettings {
  lang: string
  widgets: IWidget[]
}
