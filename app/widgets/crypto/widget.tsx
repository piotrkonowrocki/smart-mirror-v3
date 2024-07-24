/* eslint-disable camelcase */
import {FC} from 'react'
import {IconArrowDownRight, IconArrowUpRight} from '@tabler/icons-react'
import Image from 'next/image'

import {Widget} from '@/app/components/widget'
import {theme} from '@/app/styles'
import {TWidgetInterface} from '@/app/types/settings'
import {rgba} from '@/app/utils'
import {IWidgetCryptoCredentials, IWidgetCryptoResponse, IWidgetCryptoSettings} from '@/app/widgets/crypto'

export const WidgetCrypto: FC<TWidgetInterface<IWidgetCryptoSettings, IWidgetCryptoCredentials>> = ({
  credentials: {apiKey},
  settings: {baseCurrency, tokenIds},
}) => {
  return (
    <Widget<IWidgetCryptoResponse>
      name="crypto"
      queryKey={[baseCurrency, ...tokenIds]}
      request={[
        {
          url: 'https://api.coingecko.com/api/v3/coins/markets',
          params: {
            ids: tokenIds.join(','),
            priceChangePercentage: '24h',
            vsCurrency: baseCurrency,
          },
          headers: {
            'x-cg-demo-api-key': apiKey,
          },
        },
      ]}
      transformToSnakeCase
    >
      {([tokens]) => {
        return (
          <ul css={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xxs, margin: 0, padding: 0, listStyle: 'none'}}>
            {tokens.map(({currentPrice, image, priceChangePercentage_24h, symbol}, i) => {
              return (
                <li key={i} css={{display: 'flex', alignItems: 'center', columnGap: theme.spacing.xs}}>
                  <div
                    css={{
                      position: 'relative',
                      top: '-1rem',
                      height: '18rem',
                      width: '18rem',
                      filter: 'grayscale(1)',
                      borderRadius: '50%',
                      background: theme.color.foreground,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        border: '1px solid',
                        borderColor: rgba(theme.color.foreground, 0.5),
                        borderRadius: '50%',
                      },
                    }}
                  >
                    <Image src={image.replace('large', 'thumb')} alt={symbol} fill priority css={{objectFit: 'cover'}} />
                  </div>
                  {symbol.toUpperCase()}: {currentPrice}
                  {baseCurrency.toUpperCase()}{' '}
                  <span css={{color: theme.color.faded, fontSize: theme.font.size.sub}}>{priceChangePercentage_24h.toFixed(2)}%</span>
                  <div css={{position: 'relative', top: '-2rem', left: '-2rem'}}>
                    {priceChangePercentage_24h >= 0 ? (
                      <IconArrowUpRight size={20} color={theme.color.faded} />
                    ) : (
                      <IconArrowDownRight size={20} color={theme.color.faded} />
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )
      }}
    </Widget>
  )
}
