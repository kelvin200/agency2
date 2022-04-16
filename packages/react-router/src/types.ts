import { ApolloClient } from '@apollo/client'
import { Plugin } from '@webiny/plugins/types'

export interface ReactRouterOnLinkPlugin extends Plugin {
  type: 'react-router-on-link'
  onLink(params: { link: string; apolloClient: ApolloClient<any> }): void
}
