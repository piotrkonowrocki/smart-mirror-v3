import React from 'react'
import {NextPage} from 'next'

import MasterPage from '@/app/components/masterpages/masterpage'
import {DemoContent} from '@/app/components/ui/demo'

const Home: NextPage = () => {
  return (
    <MasterPage>
      <DemoContent />
    </MasterPage>
  )
}

export default Home
