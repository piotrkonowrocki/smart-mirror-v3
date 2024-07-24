import type {NextApiRequest, NextApiResponse} from 'next'
import Parser from 'rss-parser'

const parser = new Parser()

export default async function handler({method, query: {url}}: NextApiRequest, res: NextApiResponse) {
  switch (method) {
    case 'GET': {
      if (typeof url === 'string') {
        const data = await parser.parseURL(Array.isArray(url) ? url[0] : url)

        return res.status(200).json(data)
      } else return res.status(500)
    }
    default:
      return res.status(405).end()
  }
}
