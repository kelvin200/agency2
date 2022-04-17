import { PbPageData } from '@webiny/app-page-builder/types'
import React from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'

type StaticProps = {
  children: React.ReactNode
  settings: Record<string, any>
  page: PbPageData
}

const Static = ({ children, ...rest }: StaticProps) => {
  return (
    <React.Fragment>
      <Header {...rest} />
      {children}
      <Footer {...rest} />
    </React.Fragment>
  )
}

export default Static
