import {ReactNode, useEffect, useRef, useState} from 'react'
import {Id, toast} from 'react-toastify'
import {IconAlertTriangle, IconLoader2} from '@tabler/icons-react'
import {useQuery} from '@tanstack/react-query'
import {snakeCase} from 'change-case/keys'
import Parser from 'rss-parser'

import {TWidgetState} from '@/app/components/widget'
import {TWidget} from '@/app/types/settings'
import axios from '@/app/utils/axios'

interface IRequest {
  method?: 'get' | 'post' | 'rss'
  headers?: {
    [key: string]: string | number
  }
  params?: {
    [key: string]: string | number
  }
  refresh?: number
  url: string
}

interface IWidgetProps<T> {
  callback?(): unknown
  children(params: T): ReactNode
  forceLoader?: boolean
  name: TWidget['name']
  queryKey: (string | number)[]
  refresh?: number
  request?: IRequest[]
  transformToSnakeCase?: boolean
}

const parser = new Parser()

const getRequestData = async ({headers = {}, method = 'get', params = {}, url}: IRequest, transformToSnakeCase: boolean = false) => {
  const casedParams = transformToSnakeCase ? snakeCase(params) : params

  switch (method) {
    case 'get': {
      const {data} = await axios.get(url, {params: casedParams, headers})

      return data
    }
    case 'post': {
      const {data} = await axios.post(url, casedParams, {headers})

      return data
    }
    case 'rss': {
      const data = await parser.parseURL(url)

      console.log(data)

      return 'rss'
    }
    default:
      throw new Error('Unreachable case')
  }
}

export const Widget = <T extends unknown[]>({
  callback,
  children,
  forceLoader,
  name,
  queryKey,
  refresh = 1000 * 60 * 30,
  request = [],
  transformToSnakeCase = false,
}: IWidgetProps<T>) => {
  const toastId = useRef<Id>()
  const [state, setState] = useState<TWidgetState>('loading')

  const {data, error, isError, isSuccess} = useQuery({
    refetchInterval: refresh,
    queryKey: ['widget', name, ...queryKey],
    queryFn: async () => {
      const response = await Promise.all(
        request.map(async (params) => {
          const partial = await getRequestData(params, transformToSnakeCase)

          return partial
        }),
      )

      return [...response, ...(callback ? [callback()] : [])] as T
    },
    retry: 0,
  })

  useEffect(() => {
    if (isError && !toastId.current) {
      toastId.current = toast.warn(
        <>
          Error fetching data in <strong>{name}</strong> widget
          <br />
          {error.message}
        </>,
      )
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      if (toastId.current) {
        toast.dismiss(toastId.current)
        toastId.current = undefined
      }
      if (state === 'loading') {
        setState('faded')
        setTimeout(() => setState('rendered'), 400)
      }
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
      {(forceLoader || state !== 'rendered') && !isError && (
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

      {isError ? <IconAlertTriangle /> : <>{!forceLoader && state === 'rendered' && data && children(data)}</>}
    </div>
  )
}
