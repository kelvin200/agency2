import { useMutation, useQuery } from '@apollo/react-hooks'
import { Alert, Button, Space, Table } from 'antd'
import { get, set } from 'dot-prop-immutable'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

const LIST = gql`
  query List(
    $where: ListStockingInput
    $limit: Int
    $after: String
    $sort: [ListStockingSort!]
    $search: ListStockingSearchInput
  ) {
    athena {
      listStocking(where: $where, sort: $sort, limit: $limit, after: $after, search: $search) {
        data {
          id
          name
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

const IMPORT = gql`
  mutation Import($csv: String!) {
    athena {
      importStocking(csv: $csv) {
        data {
          id
          name
          price
          date
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

const extractVariables = key => {
  // TODO: Find a better way to parse the query/id from cache
  const variables = key.replace('$ROOT_QUERY.athena.listStocking(', '').replace(')', '')

  return JSON.parse(variables)
}

const modifyCacheForAllListPagesQuery = (cache, operation: (variables?: any) => void) => {
  const existingQueriesInCache = Object.keys(cache.data.data).filter(
    key => key.includes('.listStocking') && !key.endsWith('.meta'),
  )

  existingQueriesInCache.forEach(cacheKey => {
    // const variables = extractVariables(cacheKey)
    // operation(variables)
    operation()
  })
}

export const addExtraItemsToList = (cache, extraItems) => {
  modifyCacheForAllListPagesQuery(cache, variables => {
    const gqlParams = { query: LIST, variables }
    const data = cache.readQuery(gqlParams)

    const list = get(data, 'athena.listStocking.data')

    cache.writeQuery({
      ...gqlParams,
      data: set(data, 'athena.listStocking.data', list.concat(extraItems)),
    })
  })
}

export const Stocking = () => {
  const [error, setError] = useState(null)

  const [ls, setLs] = useState([])

  const variables = {}

  const { data: _ } = useQuery(LIST, {
    variables,
  })

  useEffect(() => {
    if (!_) {
      return
    }

    const { error, data } = _.athena.listStocking

    if (error) {
      setError(error.message)
      return
    }

    setLs(data.map(d => ({ ...d, key: d.id })))
  }, [_])

  const [importCsv] = useMutation(IMPORT)

  const onClick = async () => {
    const { data: res } = await importCsv({
      variables: { csv: 'h' },
      update(cache, { data }) {
        if (data.athena.importStocking.error) {
          return
        }

        addExtraItemsToList(cache, data.athena.importStocking.data)
      },
    })
    const { error } = res.athena.importStocking

    if (error) {
      return setError(error.message)
    }
  }
  console.log(ls)

  return (
    <div>
      <h1>Nhap Hang</h1>
      <Button type="primary" onClick={onClick}>
        Import
      </Button>
      {error ? <Alert message={'Error'} description={error} type="error" showIcon /> : null}
      <Table columns={columns} dataSource={ls} />
    </div>
  )
}
