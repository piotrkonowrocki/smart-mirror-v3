export enum WidgetCalendarRange {
  today = 'today',
  tomorrow = 'tomorrow',
  upcoming = 'upcoming',
}

export interface IWidgetCalendarSettings {
  calendars: {
    id: string
    label?: string
  }[]
}

export interface IWidgetCalendarCredentials {
  clientId: string
  clientSecret: string
}

export interface IGoogleOAuth2Response {
  accessToken: string
  expiresIn: number
  refreshToken: string
  scope: string
  tokenType: string
}

interface IWidgetCalendarEventDate {
  date: string
  dateTime?: never
}
interface IWidgetCalendarEventDateTime {
  date?: never
  dateTime: string
}
type TIWidgetCalendarEventStartEnd = (IWidgetCalendarEventDate | IWidgetCalendarEventDateTime) & {
  timeZone: string
}

export interface IWidgetCalendarEvent {
  created: string
  creator: {
    email: string
  }
  end: TIWidgetCalendarEventStartEnd
  etag: string
  eventType: string
  htmlLink: string
  iCalUID: string
  id: string
  kind: string
  organizer: {
    email: string
    displayName: string
    self: boolean
  }
  sequence: number
  start: TIWidgetCalendarEventStartEnd
  status: string
  summary: string
  updated: string
  reminders: {
    useDefault: boolean
  }
}

export type IWidgetCalendarResponse = {
  accessRole: string
  defaultReminders: unknown[]
  description: string
  etag: string
  items: IWidgetCalendarEvent[]
  kind: string
  nextSyncToken: string
  summary: string
  timeZone: string
  updated: string
}[]

export type IWidgetCalendarRanges = {
  [key in WidgetCalendarRange]: (IWidgetCalendarEvent & {
    currentDay: number
    duration: number
    label?: string
  })[]
}
