import { toEsRecord } from '@m/ultimate/src/es/record'
import { batchWrite, WriteRequest } from '@m/ultimate/src/util/dynamo'
import WebinyError from '@webiny/error'
import { createId, getOneIndexPK, makeCreateObj, makeEntity } from '../utils'

enum EsRecordType {
  STOCKING = 's',
}
enum EntityType {
  ONE_INDEX = 'OI',
}

export function create(params, context, returnForBatch: true): WriteRequest[]
export function create(params, context, returnForBatch?: false): Promise<any>
export function create(params, context, returnForBatch?: boolean) {
  try {
    if (!process.env.DB_TABLE) {
      throw new Error('Missing DB_TABLE')
    }
    if (!process.env.DB_TABLE_ELASTICSEARCH) {
      throw new Error('Missing DB_TABLE_ELASTICSEARCH')
    }

    const {
      pName,
      pId,
      vendor,
      quantity,
      expiryDate,
      received,
      costAud: _costA,
      audRate,
      costVnd: _costV,
    } = params

    if (typeof _costA === 'undefined' && typeof _costV === 'undefined') {
      throw new Error('Either cost AUD or cost VND has to be provided')
    }

    const id = createId()

    const entity = makeEntity({ type: EntityType.ONE_INDEX })
    const record = makeCreateObj({
      owner: false,
      id,
      context,
    })

    const PK = getOneIndexPK('S', pId)
    const SK = id

    const data = {
      ...record,
      pName,
      pId,
      vendor,
      quantity,
      expiryDate,
      received,
      costAud: 0,
      audRate,
      costVnd: 0,
    }

    const dataEs = toEsRecord({
      ...data,
      id,
      esIndex: EsRecordType.STOCKING,
    })

    const input: WriteRequest[] = [
      {
        tableName: process.env.DB_TABLE,
        request: {
          PutRequest: {
            Item: {
              ...entity,
              ...data,
              PK,
              SK,
              TYPE: 'oi.stocking',
            },
          },
        },
      },
      {
        tableName: process.env.DB_TABLE_ELASTICSEARCH,
        request: {
          PutRequest: {
            Item: {
              ...entity,
              PK,
              SK,
              data: dataEs,
              index: 'one-index',
            },
          },
        },
      },
    ]

    if (returnForBatch) {
      return input
    }

    return batchWrite(input).then(() => data)
  } catch (ex) {
    throw new WebinyError(
      ex.message || 'Could not create new page.',
      ex.code || 'CREATE_PAGE_ERROR',
      {
        params,
      },
    )
  }
}
