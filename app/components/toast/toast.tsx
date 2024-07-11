import {FC} from 'react'
import {Bounce, ToastContainer} from 'react-toastify'
import {Global} from '@emotion/react'

import {useSettings} from '@/app/context'
import {theme} from '@/app/styles'

import 'react-toastify/dist/ReactToastify.css'

export const Toast: FC = () => {
  const {font} = useSettings()

  return (
    <>
      <Global
        styles={{
          ':root': {
            '--toastify-color-light': theme.color.foreground,
            '--toastify-text-color-light': theme.color.background,
            '--toastify-color-info': theme.color.background,
            '--toastify-color-success': theme.color.background,
            '--toastify-color-warning': theme.color.background,
            '--toastify-color-error': theme.color.background,
            '--toastify-toast-width': '400rem',
            '--toastify-toast-offset': theme.spacing.m,
            '--toastify-toast-bd-radius': theme.radii.m,
            '--toastify-font-family': theme.font.family[font],
          },
          '.Toastify': {
            '&__toast': {
              marginBottom: theme.spacing.m,
              padding: theme.spacing.m,
              fontSize: theme.font.size.sub,
              '&-container': {
                padding: 0,
              },
              '&-body': {
                columnGap: theme.spacing.m,
                padding: 0,
              },
              '&-icon': {
                margin: 0,
                width: '20rem',
              },
            },
            '&__close-button': {
              display: 'none',
            },
            '&__progress-bar': {
              background: theme.color.faded,
              '&--wrp': {
                height: '4rem',
              },
              '&--bg': {
                background: 'transparent',
              },
            },
          },
        }}
      />
      <ToastContainer
        autoClose={false}
        closeOnClick={false}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        position="top-center"
        rtl={false}
        theme="light"
        transition={Bounce}
      />
    </>
  )
}
