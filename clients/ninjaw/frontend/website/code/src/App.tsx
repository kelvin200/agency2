import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Routes } from '@webiny/app/components/Routes'
import { UiProvider } from '@webiny/app/contexts/Ui'
import { BrowserRouter } from '@webiny/react-router'
import 'antd/dist/antd.css'
import React from 'react'
import './common.scss'
import './components.scss'
// import Footer from './components/Footer'
// import Header from './components/Header'
import './global.scss'
// import { apolloClient } from './components/apolloClient'

const apolloClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
})

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <UiProvider>
        <Routes />
        {/* <Header />
        <Routes />
        <Footer /> */}
      </UiProvider>
    </BrowserRouter>
  </ApolloProvider>
)
