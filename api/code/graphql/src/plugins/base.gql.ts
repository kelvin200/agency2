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

        type AthenaMutation {
          athena: AthenaMutation
        }

        extend type Query {
          athena: AthenaQuery
        }

        extend type Mutation {
          athena: AthenaMutation
        }
      `,
      resolvers: {
        Query: {
          athena: emptyResolver,
        },
        Mutation: {
          athena: emptyResolver,
        },
      },
    },
  }
}
