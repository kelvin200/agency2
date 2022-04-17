import { ApolloProvider } from '@apollo/client'
import { Routes } from '@m/app/src/components/Routes'
import { UiProvider } from '@m/app/src/contexts/Ui'
import { BrowserRouter } from '@m/react-router'
import React from 'react'

import { apolloClient } from './apolloClient'
import Footer from './components/Footer'
import Header from './components/Header'

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
