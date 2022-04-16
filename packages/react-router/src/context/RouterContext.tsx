import { ApolloClient } from '@apollo/client'
import { useApolloClient } from '@apollo/react-hooks'
import { plugins } from '@webiny/plugins'
import React, { useMemo } from 'react'
import { ReactRouterOnLinkPlugin } from '~/types'

export type ReactRouterContextValue = {
  onLink(link: string): void
}

export const RouterContext = React.createContext<ReactRouterContextValue>({
  onLink: () => {
    return void 0
  },
})

export const RouterProvider: React.FC = ({ children }) => {
  let apolloClient: ApolloClient<any>
  try {
    apolloClient = useApolloClient()
  } catch {
    // If there is no ApolloProvider, apolloClient will not exist.
  }

  const value = useMemo(() => {
    const onLinkPlugins = plugins.byType<ReactRouterOnLinkPlugin>(
      'react-router-on-link',
    )
    return {
      onLink(link: string) {
        for (let i = 0; i < onLinkPlugins.length; i++) {
          const { onLink } = onLinkPlugins[i]
          if (typeof onLink === 'function') {
            onLink({
              link,
              /**
               * TODO @pavel this function expect ApolloClient but possibly it is not defined.
               */
              apolloClient,
            })
          }
        }
      },
    }
  }, [])
  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  )
}

export const RouterConsumer: React.FC = ({ children }) => (
  <RouterContext.Consumer>
    {props => React.cloneElement(children as any, props)}
  </RouterContext.Consumer>
)
