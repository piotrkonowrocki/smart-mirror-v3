import {ReactNode, useEffect, useState} from 'react'
import {IconLoader2} from '@tabler/icons-react'
import {useQuery} from '@tanstack/react-query'
import {snakeCase} from 'change-case/keys'

import {TWidgetState} from '@/app/components/widget'
import axios from '@/app/utils/axios'

interface IWidgetProps<T> {
  callback?(): unknown
  children(params: T): ReactNode
  forceLoader?: boolean
  name: string
  queryKey: (string | number)[]
  refresh?: number
  request?: {
    method?: 'get' | 'post'
    headers?: {
      [key: string]: string | number
    }
    params?: {
      [key: string]: string | number
    }
    refresh?: number
    url: string
  }[]
  transformToSnakeCase?: boolean
}

export const Widget = <T,>({
  callback,
  children,
  forceLoader,
  name,
  queryKey,
  refresh = 1000 * 60 * 30,
  request = [],
  transformToSnakeCase = false,
}: IWidgetProps<T>) => {
  const [state, setState] = useState<TWidgetState>('loading')

  const {data, isSuccess} = useQuery({
    refetchInterval: refresh,
    queryKey: ['widget', name, ...queryKey],
    queryFn: async () => {
      const response = await Promise.all(
        request.map(async ({headers = {}, method = 'get', params = {}, url}) => {
          const casedParams = transformToSnakeCase ? snakeCase(params) : params
          const {data: partial} =
            method === 'get' ? await axios.get(url, {params: casedParams, headers}) : await axios.post(url, casedParams, {headers})

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
      {(forceLoader || state !== 'rendered') && (
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
      {!forceLoader && state === 'rendered' && data && children(data)}
    </div>
  )
}
