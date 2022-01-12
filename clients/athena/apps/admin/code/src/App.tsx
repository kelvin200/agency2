import { ApolloProvider } from '@apollo/react-components'
import { Routes } from '@webiny/app/components/Routes'
import { UiProvider } from '@webiny/app/contexts/Ui'
import { BrowserRouter } from '@webiny/react-router'
import 'antd/dist/antd.css'
import React from 'react'
import { createApolloClient } from './components/apolloClient'

export const App = () => (
  <ApolloProvider client={createApolloClient({ uri: process.env.REACT_APP_GRAPHQL_API_URL })}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <UiProvider>
        <Routes />
      </UiProvider>
    </BrowserRouter>
  </ApolloProvider>
)
