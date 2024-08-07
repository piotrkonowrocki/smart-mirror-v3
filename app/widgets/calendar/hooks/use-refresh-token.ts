import {useEffect, useState} from 'react'
import {snakeCase} from 'change-case/keys'
import {usePathname, useRouter} from 'next/navigation'

import axios from '@/app/utils/axios'
import {IGoogleOAuth2Response} from '@/app/widgets/calendar'

export const useRefreshToken = (clientId: string) => {
  const pathname = usePathname()
  const {push, replace} = useRouter()

  const [refreshToken, setRefreshToken] = useState<string>()

  useEffect(() => {
    const localRefreshToken = localStorage.getItem('refresh-token')
    const code = new URLSearchParams(document.location.search).get('code')

    if (localRefreshToken) setRefreshToken(localRefreshToken)
    else if (code) {
      axios
        .post<IGoogleOAuth2Response>(
          'https://accounts.google.com/o/oauth2/token',
          snakeCase({
            grantType: 'authorization_code',
            code,
          }),
        )
        .then(({data: {refreshToken: _refreshToken}}) => {
          if (pathname) replace(pathname)
          localStorage.setItem('refresh-token', _refreshToken)
          setRefreshToken(_refreshToken)
        })
    } else
      push(
        `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/calendar.readonly&response_type=code&access_type=offline&redirect_uri=${document.location.origin}&client_id=${clientId}`,
      )
  }, [])

  return refreshToken
}
