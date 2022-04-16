import type { ApolloClient } from '@apollo/client'
import type { Plugin } from '@m/plugins/src/types'

export interface ReactRouterOnLinkPlugin extends Plugin {
  type: 'react-router-on-link'
  onLink(params: { link: string; apolloClient: ApolloClient<any> }): void
}
