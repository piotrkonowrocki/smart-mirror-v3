export interface IWidgetCurrencyCredentials {
  apiKey: string
}

export interface IWidgetCurrencySettings {
  baseCurrency: string
  currencies: string[]
}

export type IWidgetCurrencyResponse = [
  {
    meta: {
      code: number
      disclaimer: string
    }
    response: {
      [date: string]: {
        [currency: string]: number
      }
    }
  },
]
