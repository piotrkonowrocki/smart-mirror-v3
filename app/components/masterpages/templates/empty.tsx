import React, {FC, PropsWithChildren} from 'react'

export const EmptyTemplate: FC<PropsWithChildren> = ({children}) => {
  return <>{children}</>
}
