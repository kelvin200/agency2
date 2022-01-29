import { batchWrite, WriteRequest } from '@m/ultimate/src/util/dynamo'
import WebinyError from '@webiny/error'
import groupBy from 'lodash/groupBy'
import { createWithConfidence as createProduct } from '../product/create'
import { list as searchProduct } from '../product/list'
import { ProductFlag } from '../product/type'
import { Create, EntityPK, EntityType } from '../type'
import {
  getOneIndexPK,
  makeCreateObj,
  makeEntity,
  validateRequiredFields,
} from '../utils'
import { toDbRecord } from './dbRecord'
import { toEsRecord } from './esRecord'
import { StockingEntity, StockingFlag, StockingParams } from './type'

const validateRequired = validateRequiredFields({
  requiredFields: [
    StockingEntity.PURCHASE_DATE,
    StockingEntity.TO_LOCATION,
    StockingEntity.VENDOR,
    StockingEntity.QUANTITY,
    StockingEntity.PAID_BY,
    StockingEntity.PURCHASED_BY,
  ],
  requiredFieldSets: [
    [StockingEntity.PNAME, StockingEntity.PID],
    [StockingEntity.TOTAL_AUD, StockingEntity.TOTAL_VND],
  ],
})

export const createWithConfidence = (params, context) => {
  const entity = makeEntity({ type: EntityType.ONE_INDEX })
  const record = makeCreateObj({
    owner: false,
    context,
  })

  const PK = getOneIndexPK(EntityPK.STOCKING, params.pId)
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

export const createSingle: Create = async (params, context) => {
  try {
    if (!process.env.DB_TABLE) {
      throw new Error('Missing DB_TABLE')
    }
    if (!process.env.DB_TABLE_ELASTICSEARCH) {
      throw new Error('Missing DB_TABLE_ELASTICSEARCH')
    }
    validateRequired(params)

    // TODO: No pId => search pId => create product record
    const _input: WriteRequest[] = []
    if (!params.pId) {
      const { pName } = params

      const { data: products } = await searchProduct(
        {
          search: {
            query: pName,
          },
        },
        context,
      )

      if (products.length === 0) {
        // No products found, create one and flag it for review
        // need enum for flag
        const { input: _i, data } = createProduct(
          { name: pName, flag: ProductFlag.REVIEW_NEEDED },
          context,
        )
        params.pId = data.id
        _input.push(..._i)
      } else {
        // If there is/are product(s), create the stocking entry with the first one and flag it for review
        params.pId = products[0].id
        // need enum for flag
        params.flag = StockingFlag.REVIEW_NEEDED
      }
    }

    const { data, input } = createWithConfidence(params, context)

    await batchWrite([..._input, ...input])
    return { data, input }
  } catch (ex) {
    throw new WebinyError(
      ex.message || 'Could not create stocking entry.',
      ex.code || 'CREATE_STOCKING_ERROR',
      ex.data || {
        params,
        stack: ex.stack,
      },
    )
  }
}

export const createBatch: Create = async (
  params: StockingParams[],
  context,
) => {
  try {
    if (!process.env.DB_TABLE) {
      throw new Error('Missing DB_TABLE')
    }
    if (!process.env.DB_TABLE_ELASTICSEARCH) {
      throw new Error('Missing DB_TABLE_ELASTICSEARCH')
    }

    const pWithNoPid: StockingParams[] = []
    const errors = []
    const pReady = []

    for (const p of params) {
      const e = validateRequired(p, true)
      if (e) {
        errors.push(e)
        continue
      }

      if (!p.pId) {
        pWithNoPid.push(p)
        continue
      }

      pReady.push(p)
    }

    const dataReady = []
    const inputReady = []

    const groups = groupBy(pWithNoPid, 'pName')

    for (const k in groups) {
      const { data: products } = await searchProduct(
        {
          search: {
            query: k,
          },
        },
        context,
      )

      if (products.length === 0) {
        // No products found, create one and flag it for review
        // need enum for flag
        const { input: _i, data } = createProduct(
          { name: k, flag: ProductFlag.REVIEW_NEEDED },
          context,
        )
        for (const a of groups[k]) {
          a.pId = data.id
        }
        inputReady.push(..._i)
      } else {
        for (const a of groups[k]) {
          // If there is/are product(s), create the stocking entry with the first one and flag it for review
          a.pId = products[0].id
          // need enum for flag
          a.flag = StockingFlag.REVIEW_NEEDED
        }
      }
    }

    pReady.push(...pWithNoPid)

    for (const p of pReady) {
      const { data, input } = createWithConfidence(p, context)
      dataReady.push(data)
      inputReady.push(...input)
    }

    await batchWrite(inputReady)
    return { data: dataReady, input: inputReady }
  } catch (ex) {
    throw new WebinyError(
      ex.message || 'Could not batch create stocking entry.',
      ex.code || 'BATCH_CREATE_STOCKING_ERROR',
      ex.data || {
        params,
        stack: ex.stack,
      },
    )
  }
}
