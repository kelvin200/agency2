import { useMutation } from '@apollo/react-hooks'
import { Button } from 'antd'
import { get, set } from 'dot-prop-immutable'
import React, { ChangeEventHandler, useState } from 'react'

import { IMPORT, LIST } from './gql'

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

const addExtraItemsToList = (cache, extraItems) => {
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

export const useImport = () => {
  const [error, setError] = useState(null)

  const [importCsv] = useMutation(IMPORT)

  const onImportClick = async () => {
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
  const onImportFileChange: ChangeEventHandler<HTMLInputElement> = event => {
    const file = event.target.files[0]
    if (!file) {
      setCsv('')
      return
    }

    file.text().then(setCsv)
  }

  return {
    error,
    importComp: (
      <div>
        <Button type="primary" onClick={onImportClick} disabled={!csv}>
          Import
        </Button>
        <input type="file" onChange={onImportFileChange} accept=".csv" />
      </div>
    ),
  }
}
