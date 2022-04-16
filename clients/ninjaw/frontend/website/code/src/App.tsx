import { ApolloProvider } from '@apollo/client'
import { BrowserRouter } from '@m/react-router/src'
import { Routes } from '@webiny/app/components/Routes'
import { UiProvider } from '@webiny/app/contexts/Ui'
import 'antd/dist/antd.css'
import React from 'react'
import { apolloClient } from './apolloClient'
import './common.scss'
import './components.scss'
import Footer from './components/Footer'
import Header from './components/Header'
import './global.scss'

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <UiProvider>
        <Header />
        <Routes />
        <Footer />
      </UiProvider>
    </BrowserRouter>
  </ApolloProvider>
)
