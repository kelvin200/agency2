import { DynamoDB } from 'aws-sdk'
import chunk from 'lodash/chunk'

export interface WriteRequest {
  tableName: string
  request: DynamoDB.DocumentClient.WriteRequest
}

export const batchWrite = (items: WriteRequest[]) => {
  const documentClient = new DynamoDB.DocumentClient()

  items.sort((a, b) => a.tableName.localeCompare(b.tableName))

  return Promise.all(
    chunk(items, 25).map(c => {
      const r: DynamoDB.DocumentClient.BatchWriteItemRequestMap = {}

      for (const i of c) {
        if (!r[i.tableName]) {
          r[i.tableName] = [i.request]
        } else {
          r[i.tableName] = r[i.tableName].concat(i.request)
        }
      }

      return documentClient.batchWrite({ RequestItems: r }).promise()
    }),
  )
}
