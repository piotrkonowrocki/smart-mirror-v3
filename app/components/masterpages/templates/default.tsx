import React, {FC, PropsWithChildren} from 'react'

import {Footer, Header} from '@/app/components/layout'

export const DefaultTemplate: FC<PropsWithChildren> = ({children}) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
)
