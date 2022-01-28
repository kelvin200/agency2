import { batchWrite, WriteRequest } from '@m/ultimate/src/util/dynamo'
import WebinyError from '@webiny/error'
import { Create, EntityPK, EntityType } from '../type'
import { getOneIndexPK, makeCreateObj, makeEntity } from '../utils'
import { toDbRecord } from './dbRecord'
import { toEsRecord } from './esRecord'
import { StockingEntity } from './type'

const validateRequiredFields =
  ({
    requiredFields,
    requiredFieldSets,
  }: {
    requiredFields: string[]
    requiredFieldSets: string[][]
  }) =>
  (params = {}) => {
    const er = requiredFields.filter(k => !(k in params))
    if (er.length > 0) {
      throw new Error(`[${er.join(', ')}] are required!`)
    }

    const es = requiredFieldSets.filter(ks => ks.every(k => !(k in params)))
    if (es.length > 0) {
      throw new Error(
        es
          .map(ks => `One of the fields: [${ks.join(', ')}] are required!`)
          .join('\n'),
      )
    }
  }

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

export const create: Create = async (
  params,
  context,
  returnForBatch?: boolean,
) => {
  try {
    if (!process.env.DB_TABLE) {
      throw new Error('Missing DB_TABLE')
    }
    if (!process.env.DB_TABLE_ELASTICSEARCH) {
      throw new Error('Missing DB_TABLE_ELASTICSEARCH')
    }
    validateRequired(params)

    const entity = makeEntity({ type: EntityType.ONE_INDEX })
    const record = makeCreateObj({
      owner: false,
      context,
    })

    let { pId } = params
    // TODO: No pId => search pId => create product record

    if (!pId) {
      pId = ''
    }

    const PK = getOneIndexPK(EntityPK.STOCKING, pId)
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

    if (returnForBatch) {
      return { input, data }
    }

    await batchWrite(input)
    return { data }
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
