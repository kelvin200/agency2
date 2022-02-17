import { makeVar, useReactiveVar } from '@apollo/client'
import { useQuery } from '@apollo/react-hooks'
import { Alert, Popconfirm, Space, Table, TableProps, Tooltip } from 'antd'
import { set } from 'dot-prop-immutable'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { LIST } from './gql'
import { CollectionCreateForm } from './useCreate'
import { useImport } from './useImport'

const initVars = {
  from: 0,
  sort: ['purchaseDate_DESC'],
}

export const queryVars = makeVar(initVars)

export const Stocking = () => {
  const [error, setError] = useState(null)
  const [ls, setLs] = useState([])
  const [total, setTotal] = useState(undefined)

  const [variables, setVariables] = useState<any>({})

  const { data: lsQueryRaw, loading } = useQuery(LIST, {
    variables: useReactiveVar(queryVars),
  })

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (key: any) => {
    setIsModalVisible(true)
  }

  const handleDelete = useCallback(() => {}, [])

  const columns: TableProps<any>['columns'] = useMemo(
    () => [
      {
        title: 'Purchase Date',
        dataIndex: 'purchaseDate',
        key: 'purchaseDate',
        sorter: true,
        defaultSortOrder: 'descend',
        sortDirections: ['ascend', 'descend', 'ascend'],
        width: 150,
      },
      {
        title: 'Product Name',
        dataIndex: 'pName',
        key: 'pName',
        width: 300,
        ellipsis: {
          showTitle: false,
        },
        render: v => (
          <Tooltip placement="topLeft" title={v}>
            {v}
          </Tooltip>
        ),
      },
      {
        title: 'Vendor',
        dataIndex: 'vendor',
        key: 'vendor',
        width: 100,
      },
      {
        title: 'Location',
        dataIndex: 'toLocation',
        key: 'toLocation',
        width: 120,
        filters: [
          { text: 'Melbourne', value: 'melbourne' },
          { text: 'Perth', value: 'perth' },
        ],
      },
      {
        title: 'Expiry Date',
        dataIndex: 'expiryDate',
        key: 'expiryDate',
        sorter: true,
        width: 150,
        sortDirections: ['ascend', 'descend', 'ascend'],
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        width: 90,
      },
      {
        title: 'Action',
        key: 'action',
        width: 100,
        render: (_, record: { key: React.Key }) => (
          <Space size="middle">
            <a onClick={() => showModal(record.key)}>Edit</a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete()}
            >
              <a>Delete</a>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleDelete, showModal],
  )

  useEffect(() => {
    if (!lsQueryRaw) {
      return
    }

    const { error, data, meta } = lsQueryRaw.athena.listStocking

    if (error) {
      setError(error.message)
      return
    }

    setLs(data)
    setTotal(meta.total)
  }, [lsQueryRaw])

  const onTableChange: TableProps<any>['onChange'] = (
    pagination,
    filters,
    sorter,
  ) => {
    let newVars = variables

    if (!Array.isArray(sorter)) {
      sorter = [sorter]
    }

    sorter = sorter.filter(s => !!s.order)

    const ss = []
    for (const s of sorter) {
      ss.push(`${s.field}_${s.order === 'ascend' ? 'ASC' : 'DESC'}`)
    }

    if (ss.join(',') !== newVars?.sort?.join(',')) {
      newVars = set(newVars, 'sort', ss)
    }

    const { current = 1, pageSize = 10 } = pagination || {}
    const nF = (current - 1) * pageSize
    if (nF !== newVars.from) {
      newVars = set(newVars, 'from', nF)
    }

    if (newVars !== variables) {
      setVariables(newVars)
      queryVars(newVars)
    }
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const { error: importError, importComp } = useImport()

  return (
    <div>
      <h1>Nhap Hang</h1>
      {error && (
        <Alert
          message={'Error'}
          description={error || importError}
          type="error"
          showIcon
        />
      )}
      {importComp}
      <Table
        columns={columns}
        dataSource={ls}
        loading={loading}
        onChange={onTableChange}
        pagination={{
          total,
        }}
      />
      <CollectionCreateForm
        visible={isModalVisible}
        onCreate={handleOk}
        onCancel={handleCancel}
      />
    </div>
  )
}
