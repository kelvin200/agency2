import { ErrorResponse, ListResponse, Response } from '@webiny/handler-graphql/responses'

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
      type NhapHangRecord {
        id: String
        name: String
        price: Int
        date: String
      }

      type ListNhapHangResponse {
        data: [NhapHangRecord]
        error: PbError
      }

      extend type AthenaQuery {
        listNhapHang: ListNhapHangResponse
      }

      extend type AthenaMutation {
        importNhapHang(csv: String): ListNhapHangResponse
      }
    `,
    resolvers: {
      AthenaQuery: {
        listNhapHang: async (_, args, context) => {
          try {
            const data = [
              {
                id: '1',
                name: 'John Brown',
                price: 32,
                date: 'New York No. 1 Lake Park',
              },
              {
                id: '2',
                name: 'Jim Green',
                price: 42,
                date: 'London No. 1 Lake Park',
              },
              {
                id: '3',
                name: 'Joe Black',
                price: 32,
                date: 'Sidney No. 1 Lake Park',
              },
            ]
            return new ListResponse(data)
          } catch (e) {
            return new ErrorResponse(e)
          }
        },
      },
      AthenaMutation: {
        importNhapHang: async (_, args: { csv?: string }, context) =>
          resolve(() => {
            const { csv } = args
            if (!csv) {
              throw new Error(`csv required`)
            }
            return [
              {
                id: '5',
                name: 'test',
                price: 1111,
                date: 'asafasdasdas',
              },
              {
                id: '6',
                name: 'test 2',
                price: 3333,
                date: 'cbfbvbcxv',
              },
            ]
          }),
      },
    },
  },
})
