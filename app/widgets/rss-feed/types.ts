export interface IWidgetRssFeedSettings {
  feeds: string[]
  maxItems?: number
}

export interface IWidgetRssFeedItem {
  content: string
  contentSnippet: string
  isoDate: string
  link: string
  pubDate: string
  title: string
}

export type IWidgetRssFeedResponse = {
  feedUrl: string
  link: string
  title: string
  items: IWidgetRssFeedItem[]
}[]
