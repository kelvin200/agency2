import { batchWrite, WriteRequest } from '@m/ultimate/src/util/dynamo'
import WebinyError from '@webiny/error'

import { Create, EntityPK, EntityType } from '../type'
import {
  getOneIndexPK,
  makeCreateObj,
  makeEntity,
  validateRequiredFields,
} from '../utils'
import { toDbRecord } from './dbRecord'
import { toEsRecord } from './esRecord'
import { Product, ProductEntity } from './type'

const validateRequired = validateRequiredFields({
  requiredFields: [ProductEntity.NAME],
})

export const createWithConfidence = (params, context) => {
  const entity = makeEntity({ type: EntityType.ONE_INDEX })
  const record = makeCreateObj({
    owner: false,
    createdBy: false,
    context,
  })

  const PK = getOneIndexPK(EntityPK.PRODUCT)
  const SK = record.id

  const data = {
    ...record,
    ...params,
  }

  const itemDb = toDbRecord(data, d => ({
    ...entity,
    ...d,
    PK,
    SK,
  }))

  const itemEs = toEsRecord(data, d => ({
    data: d,
    PK,
    SK,
  }))

  const input: WriteRequest[] = [
    {
      tableName: process.env.DB_TABLE,
      request: {
        PutRequest: {
          Item: itemDb,
        },
      },
    },
    {
      tableName: process.env.DB_TABLE_ELASTICSEARCH,
      request: {
        PutRequest: {
          Item: itemEs,
        },
      },
    },
  ]

  return { input, data }
}

export const create: Create<Product> = async (params, context) => {
  try {
    if (!process.env.DB_TABLE) {
      throw new Error('Missing DB_TABLE')
    }
    if (!process.env.DB_TABLE_ELASTICSEARCH) {
      throw new Error('Missing DB_TABLE_ELASTICSEARCH')
    }
    validateRequired(params)

    const { data, input } = createWithConfidence(params, context)

    await batchWrite(input)
    return { data, input }
  } catch (ex) {
    throw new WebinyError(
      ex.message || 'Could not create product.',
      ex.code || 'CREATE_PRODUCT_ERROR',
      ex.data || {
        params,
        stack: ex.stack,
      },
    )
  }
}
