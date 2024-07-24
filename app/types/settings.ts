import {TWidgetRegionX, TWidgetRegionY} from '@/app/components/region'
import {theme} from '@/app/styles'
import {IWidgetCalendarCredentials, IWidgetCalendarSettings} from '@/app/widgets/calendar'
import {IWidgetClockSettings} from '@/app/widgets/clock'
import {IWidgetCryptoCredentials, IWidgetCryptoSettings} from '@/app/widgets/crypto'
import {IWidgetCurrencyCredentials, IWidgetCurrencySettings} from '@/app/widgets/currency'
import {IWidgetForecastCredentials, IWidgetForecastSettings} from '@/app/widgets/forecast'
import {IWidgetRssFeedSettings} from '@/app/widgets/rss-feed'

export type TWidgetInterface<S, C = never> = {
  settings: S
} & ([C] extends [never]
  ? {
      credentials?: never
    }
  : {
      credentials: C
    })

type TWidgetCommons<S, C = never> = TWidgetInterface<S, C> & {
  region: [TWidgetRegionX, TWidgetRegionY]
}

interface IWidgetCalendar extends TWidgetCommons<IWidgetCalendarSettings, IWidgetCalendarCredentials> {
  name: 'calendar'
}
interface IWidgetClock extends TWidgetCommons<IWidgetClockSettings> {
  name: 'clock'
}
interface IWidgetCrypto extends TWidgetCommons<IWidgetCryptoSettings, IWidgetCryptoCredentials> {
  name: 'crypto'
}
interface IWidgetCurrency extends TWidgetCommons<IWidgetCurrencySettings, IWidgetCurrencyCredentials> {
  name: 'currency'
}
interface IWidgetForecast extends TWidgetCommons<IWidgetForecastSettings, IWidgetForecastCredentials> {
  name: 'forecast'
}
interface IWidgetRssFeed extends TWidgetCommons<IWidgetRssFeedSettings> {
  name: 'rss-feed'
}

export type TWidget = IWidgetCalendar | IWidgetClock | IWidgetCrypto | IWidgetCurrency | IWidgetForecast | IWidgetRssFeed
export type TFontFamily = keyof typeof theme.font.family

export interface ISettings {
  debug?: boolean
  font: TFontFamily
  lang: string
  scale: number
  widgets: TWidget[]
}
