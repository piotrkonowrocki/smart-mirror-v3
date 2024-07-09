export interface IWidgetCryptoCredentials {
  apiKey: string
}

export interface IWidgetCryptoSettings {
  baseCurrency: string
  tokenIds: string[]
}

export type IWidgetCryptoResponse = [
  {
    athChangePercentage: number
    athDate: string
    ath: number
    atlChangePercentage: number
    atlDate: string
    atl: number
    circulatingSupply: number
    currentPrice: number
    fullyDilutedValuation: number
    high_24h: number
    id: string
    image: string
    lastUpdated: string
    low_24h: number
    marketCapChange_24h: number
    marketCapChangePercentage_24h: number
    marketCapRank: number
    marketCap: number
    maxSupply: number
    name: string
    priceChange_24h: number
    priceChangePercentage_24h: number
    symbol: string
    totalSupply: number
    totalVolume: number
  }[],
]
