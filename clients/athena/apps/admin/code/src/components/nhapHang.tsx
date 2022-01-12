import { useApolloClient } from '@apollo/react-hooks'
import { Alert, Space, Table, Tag } from 'antd'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
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

const LIST_NHAP_HANG = gql`
  query Hello {
    athena {
      listNhapHang {
        data {
          key
          name
          age
          address
          tags
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

export const NhapHang = () => {
  const client = useApolloClient()
  const [error, setError] = useState(null)

  const [data, setData] = useState([])

  useEffect(() => {
    client.query({ query: LIST_NHAP_HANG }).then(({ data: _ }) => {
      const { error, data } = _.athena.listNhapHang

      if (error) {
        setError(error.message)
        return
      }

      setData(data)
    })
  })

  return (
    <div>
      <h1>Nhap Hang</h1>
      {error ? <Alert type="error">{error}</Alert> : null}
      <Table columns={columns} dataSource={data} />
    </div>
  )
}
