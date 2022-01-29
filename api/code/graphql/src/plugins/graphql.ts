import { ErrorResponse, Response } from '@webiny/handler-graphql/responses'
import { importStocking } from './stocking/import'
import { listStocking } from './stocking/list'

const resolve = async fn => {
  try {
    return new Response(await fn())
  } catch (e) {
    return new ErrorResponse(e)
  }
}

export const createAthenaGraphQL = () => ({
  type: 'graphql-schema',
  schema: {
    typeDefs: /* GraphQL */ `
      type StockingRecord {
        id: String
        pName: String
        purchaseDate: String
        vendor: String
        toLocation: String
        quantity: Number
        expiryDate: String
      }

      type Meta {
        total: Number
      }

      type ListStockingResponse {
        data: [StockingRecord]
        meta: Meta
        error: PbError
      }

      input ListStockingInput {
        toLocation: String
        vendor: String
        tags: ListStockingWhereTagsInput
      }

      enum TagsRule {
        all
        any
      }

      input ListStockingWhereTagsInput {
        query: [String]
        rule: TagsRule
      }

      enum ListStockingSort {
        quantity_ASC
        quantity_DESC
        expiryDate_ASC
        expiryDate_DESC
        purchaseDate_ASC
        purchaseDate_DESC
      }

      input ListStockingSearchInput {
        query: String
      }

      extend type AthenaQuery {
        listStocking(
          where: ListStockingInput
          limit: Int
          after: String
          sort: [ListStockingSort!]
          search: ListStockingSearchInput
        ): ListStockingResponse
      }

      extend type AthenaMutation {
        importStocking(csv: String): ListStockingResponse
      }
    `,
    resolvers: {
      AthenaQuery: {
        listStocking: (_, args, context) => {
          try {
            return listStocking(args, context)
          } catch (e) {
            return new ErrorResponse(e)
          }
        },
      },
      AthenaMutation: {
        importStocking: (_, args: { csv?: string }, context) =>
          resolve(() => {
            try {
              const { csv } = args
              if (!csv) {
                throw new Error(`csv required`)
              }

              return importStocking({ csv }, context)
            } catch (e) {
              return new ErrorResponse(e)
            }
          }),
      },
    },
  },
})
