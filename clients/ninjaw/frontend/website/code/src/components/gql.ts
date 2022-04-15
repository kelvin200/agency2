import gql from 'graphql-tag'

export const LIST = gql`
  query List(
    $where: ListStockingInput
    $limit: Int
    $from: Int
    $sort: [ListStockingSort!]
    $search: ListStockingSearchInput
  ) {
    athena {
      listStocking(
        where: $where
        sort: $sort
        limit: $limit
        from: $from
        search: $search
      ) {
        data {
          id
          key: id
          pName
          purchaseDate
          vendor
          toLocation
          quantity
          expiryDate
        }
        meta {
          total
        }
        error {
          code
          data
          message
        }
      }
    }
  }
`

export const IMPORT = gql`
  mutation Import($csv: String!) {
    athena {
      importStocking(csv: $csv) {
        data {
          id
          key: id
          pName
          purchaseDate
          vendor
          toLocation
          quantity
          expiryDate
        }
        error {
          code
          data
          message
        }
      }
    }
  }
`
