import {ReactNode, useEffect, useState} from 'react'
import {IconLoader2} from '@tabler/icons-react'
import {useQuery} from '@tanstack/react-query'

import {TWidgetState} from '@/app/components/widget'
import axios from '@/app/utils/axios'

interface IWidgetProps<T> {
  callback?(): unknown
  children(params: T): ReactNode
  queryKey: (string | number)[]
  refresh?: number
  request?: {
    method?: 'get' | 'post'
    params?: {
      [key: string]: string | number
    }
    refresh?: number
    url: string
  }[]
  name: string
}

export const Widget = <T,>({callback, children, queryKey, refresh = 1000 * 60 * 30, request = [], name}: IWidgetProps<T>) => {
  const [state, setState] = useState<TWidgetState>('loading')

  const {data, isSuccess} = useQuery({
    refetchInterval: refresh,
    queryKey: ['widget', name, ...queryKey],
    queryFn: async () => {
      const response = await Promise.all(
        request.map(async ({method = 'get', params = {}, url}) => {
          const {data: partial} = await axios[method](url, {params})

          return partial
        }),
      )

      return [...response, ...(callback ? [callback()] : [])] as T
    },
  })

  useEffect(() => {
    if (isSuccess && state === 'loading') {
      setState('faded')
      setTimeout(() => setState('rendered'), 400)
    }
  }, [isSuccess])

  return (
    <div
      css={{
        display: 'inline-flex',
        flexDirection: 'column',
        '.region-left &': {
          alignItems: 'flex-start',
        },
        '.region-right &': {
          alignItems: 'flex-end',
        },
        opacity: state === 'faded' ? 0 : 1,
        transition: 'opacity 200ms',
      }}
    >
      {state !== 'rendered' && (
        <IconLoader2
          size="48rem"
          strokeWidth="2.5rem"
          css={{
            animation: 'example 800ms linear infinite',
            '@keyframes example': {
              '0%': {transform: 'rotate(0deg)'},
              '50%': {transform: 'rotate(180deg)'},
              '100%': {transform: 'rotate(360deg)'},
            },
          }}
        />
      )}
      {state === 'rendered' && children(data as T)}
    </div>
  )
}
