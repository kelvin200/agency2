import { ErrorResponse, ListResponse } from '@webiny/handler-graphql/responses'

export const createAthenaGraphQL = () => ({
  type: 'graphql-schema',
  schema: {
    typeDefs: /* GraphQL */ `
      type NhapHangRecord {
        key: String
        name: String
        age: Int
        address: String
        tags: [String]
      }

      type ListNhapHangResponse {
        data: [NhapHangRecord]
        error: PbError
      }

      extend type AthenaQuery {
        listNhapHang: ListNhapHangResponse
      }
    `,
    resolvers: {
      AthenaQuery: {
        listNhapHang: async (_, args, context) => {
          try {
            const data = [
              {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
              },
              {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
              },
              {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
              },
            ]
            return new ListResponse(data)
          } catch (e) {
            return new ErrorResponse(e)
          }
        },
      },
    },
  },
})
