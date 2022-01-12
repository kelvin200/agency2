import { GraphQLSchemaPlugin } from '@webiny/handler-graphql/types'

const emptyResolver = () => ({})

export const createBaseGraphQL = (): GraphQLSchemaPlugin => {
  return {
    type: 'graphql-schema',
    schema: {
      typeDefs: /* GraphQL */ `
        type AthenaQuery {
          athena: AthenaQuery
        }

        extend type Query {
          athena: AthenaQuery
        }
      `,
      resolvers: {
        Query: {
          athena: emptyResolver,
        },
      },
    },
  }
}
