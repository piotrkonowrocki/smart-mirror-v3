import {FC} from 'react'
import {IconArrowDownRight, IconArrowUpRight} from '@tabler/icons-react'
import dayjs from 'dayjs'
import Image from 'next/image'

import {Widget} from '@/app/components/widget'
import {theme} from '@/app/styles'
import {TWidgetInterface} from '@/app/types/settings'
import {IWidgetCurrencyCredentials, IWidgetCurrencyResponse, IWidgetCurrencySettings} from '@/app/widgets/currency'

export const WidgetCurrency: FC<TWidgetInterface<IWidgetCurrencySettings, IWidgetCurrencyCredentials>> = ({
  credentials: {apiKey},
  settings: {baseCurrency, currencies},
}) => {
  return (
    <Widget<IWidgetCurrencyResponse>
      name="currency"
      queryKey={[baseCurrency, ...currencies]}
      request={[
        {
          url: 'https://api.currencybeacon.com/v1/timeseries',
          params: {
            apiKey,
            base: baseCurrency,
            endDate: dayjs().format('YYYY-MM-DD'),
            startDate: dayjs().subtract(2, 'days').format('YYYY-MM-DD'),
            symbols: currencies.join(','),
          },
        },
      ]}
      transformToSnakeCase
    >
      {([{response}]) => {
        const [previous, current] = Object.values(response).slice(-2)

        return (
          <ul css={{display: 'flex', flexDirection: 'column', rowGap: theme.spacing.xxs, margin: 0, padding: 0, listStyle: 'none'}}>
            {Object.entries(current).map(([currency, value], i) => {
              const change = (previous[currency] / value) * 100 - 100

              return value ? (
                <li key={i} css={{display: 'flex', alignItems: 'center', columnGap: theme.spacing.xs}}>
                  <div css={{position: 'relative', top: '-1rem', height: '16rem', width: '24rem', filter: 'grayscale(1)'}}>
                    <Image
                      src={`https://flagcdn.com/${currencies[i].slice(0, 2).toLowerCase()}.svg`}
                      alt={currencies[i]}
                      fill
                      priority
                      css={{objectFit: 'cover'}}
                    />
                  </div>
                  {currency.toUpperCase()}: {(1 / value).toFixed(2)}
                  {baseCurrency.toUpperCase()}{' '}
                  <span css={{color: theme.color.faded, fontSize: theme.font.size.sub}}>{change.toFixed(2)}%</span>
                  <div css={{position: 'relative', top: '-2rem', left: '-2rem'}}>
                    {change >= 0 ? (
                      <IconArrowUpRight size={20} color={theme.color.faded} />
                    ) : (
                      <IconArrowDownRight size={20} color={theme.color.faded} />
                    )}
                  </div>
                </li>
              ) : null
            })}
          </ul>
        )
      }}
    </Widget>
  )
}
