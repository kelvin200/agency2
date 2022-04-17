import { ApolloProvider } from '@apollo/react-components'
import { PageBuilderProvider } from '@webiny/app-page-builder/contexts/PageBuilder'
import { BrowserRouter, Route,Switch } from '@webiny/react-router'
import React from 'react'

import { createApolloClient } from './components/apolloClient'
import Page from './components/Page'

export const App = () => (
  <ApolloProvider client={createApolloClient()}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <PageBuilderProvider>
        <Switch>
          <Route path={'*'} component={Page} />
        </Switch>
      </PageBuilderProvider>
    </BrowserRouter>
  </ApolloProvider>
)
