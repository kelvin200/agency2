import { useMutation, useQuery } from '@apollo/react-hooks'
import { Alert, Button, Table, TableProps } from 'antd'
import { get, set } from 'dot-prop-immutable'
import gql from 'graphql-tag'
import React, { ChangeEventHandler, useEffect, useState } from 'react'

const columns = [
  {
    title: 'Purchase Date',
    dataIndex: 'purchaseDate',
    key: 'purchaseDate',
    sorter: (a, b) => a.purchaseDate.localeCompare(b.purchaseDate),
  },
  {
    title: 'Product Name',
    dataIndex: 'pName',
    key: 'pName',
  },
  {
    title: 'Vendor',
    dataIndex: 'vendor',
    key: 'vendor',
  },
  {
    title: 'Location',
    dataIndex: 'toLocation',
    key: 'toLocation',
    filters: [
      { text: 'Melbourne', value: 'melbourne' },
      { text: 'Perth', value: 'perth' },
    ],
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expiryDate',
    key: 'expiryDate',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (text, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
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
      listStocking(
        where: $where
        sort: $sort
        limit: $limit
        after: $after
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

const IMPORT = gql`
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

const extractVariables = key => {
  // TODO: Find a better way to parse the query/id from cache
  const variables = key
    .replace('$ROOT_QUERY.athena.listStocking(', '')
    .replace(')', '')

  return JSON.parse(variables)
}

const modifyCacheForAllListPagesQuery = (
  cache,
  operation: (variables?: any) => void,
) => {
  const existingQueriesInCache = Object.keys(cache.data.data).filter(
    key => key.includes('.listStocking') && !key.endsWith('.meta'),
  )

  existingQueriesInCache.forEach(cacheKey => {
    const variables = extractVariables(cacheKey)
    operation(variables)
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

  const variables = { sort: ['expiryDate_ASC'] }

  const { data: lsQueryRaw, loading } = useQuery(LIST, {
    variables,
  })

  useEffect(() => {
    if (!lsQueryRaw) {
      return
    }

    const { error, data } = lsQueryRaw.athena.listStocking

    if (error) {
      setError(error.message)
      return
    }

    setLs(data)
  }, [lsQueryRaw])

  const [importCsv] = useMutation(IMPORT)

  const onClick = async () => {
    if (!csv) {
      setError('Select csv file first!')
      return
    }
    const { data: res } = await importCsv({
      variables: { csv },
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

  const [csv, setCsv] = useState('')
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files[0]
    if (!file) {
      setCsv('')
      return
    }

    file.text().then(setCsv)
  }

  const handleTableChange: TableProps<any>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    let l = [...lsQueryRaw.athena.listStocking.data]

    for (const k in filters) {
      if (filters[k] === null) {
        continue
      }

      l = l.filter(x => filters[k].includes(x[k].toLowerCase()))
    }

    if (!Array.isArray(sorter)) {
      sorter = [sorter]
    }

    for (const s of sorter) {
      l.sort((a, b) =>
        s.order === 'ascend'
          ? // @ts-ignore
            s.column.sorter(a, b)
          : s.order === 'descend'
          ? // @ts-ignore
            -s.column.sorter(a, b)
          : 0,
      )
    }

    setLs(l)
  }

  return (
    <div>
      <h1>Nhap Hang</h1>
      <Button type="primary" onClick={onClick} disabled={!csv}>
        Import
      </Button>
      <input type="file" onChange={onChange} accept=".csv" />
      {error && (
        <Alert message={'Error'} description={error} type="error" showIcon />
      )}
      <Table
        columns={columns}
        dataSource={ls}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}
