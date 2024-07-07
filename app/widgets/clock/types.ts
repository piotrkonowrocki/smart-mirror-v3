export type TWidgetClockFormat = '12' | '24'

export interface IWidgetClockSettings {
  format: TWidgetClockFormat
}

export type IWidgetClockResponse = [
  {
    timestamp: number
  },
]
