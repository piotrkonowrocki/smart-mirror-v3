import type {NextApiRequest, NextApiResponse} from 'next'
import Parser from 'rss-parser'

const parser = new Parser()

export default async function handler({method, query: {url}}: NextApiRequest, res: NextApiResponse) {
  switch (method) {
    case 'GET': {
      if (typeof url === 'string') {
        const buffer = await (await fetch(url)).arrayBuffer()
        const text = await (await fetch(url)).text()

        const encoding = text
          .toLowerCase()
          .substring(0, text.lastIndexOf('?>'))
          .substring(text.indexOf('encoding=') + 'encoding='.length)
          .replace(/"|'/gu, '')

        const decoded = new TextDecoder(encoding).decode(buffer)
        const data = await parser.parseString(decoded)

        return res.status(200).json(data)
      } else return res.status(500)
    }
    default:
      return res.status(405).end()
  }
}
