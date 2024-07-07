import {TWidgetRegionX, TWidgetRegionY} from '@/app/components/region'
import {IWidgetCalendarCredentials, IWidgetCalendarSettings} from '@/app/widgets/calendar'
import {IWidgetClockSettings} from '@/app/widgets/clock'
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
interface IWidgetForecast extends IWidgetCommons {
  name: 'forecast'
  credentials: IWidgetForecastCredentials
  settings: IWidgetForecastSettings
}

export type IWidget = IWidgetCalendar | IWidgetClock | IWidgetForecast

export interface ISettings {
  lang: string
  widgets: IWidget[]
}
