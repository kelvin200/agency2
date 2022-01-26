import { toEsRecord } from '@m/ultimate/src/es/record'
import { batchWrite, WriteRequest } from '@m/ultimate/src/util/dynamo'
import WebinyError from '@webiny/error'
import { createId, getOneIndexPK, makeCreateObj, makeEntity } from '../utils'
import { EntityType, EsRecordType } from './type'

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
  requiredFields: ['purchaseDate', 'toLocation', 'vendor', 'quantity'],
  requiredFieldSets: [
    ['pName', 'pId'],
    ['costAud', 'costVnd'],
  ],
})

export async function create(
  params,
  context,
  returnForBatch: true,
): Promise<{ input: WriteRequest[]; data: any }>
export async function create(
  params,
  context,
  returnForBatch?: false,
): Promise<any>
export async function create(params, context, returnForBatch?: boolean) {
  try {
    if (!process.env.DB_TABLE) {
      throw new Error('Missing DB_TABLE')
    }
    if (!process.env.DB_TABLE_ELASTICSEARCH) {
      throw new Error('Missing DB_TABLE_ELASTICSEARCH')
    }
    validateRequired(params)

    const id = createId()

    const entity = makeEntity({ type: EntityType.ONE_INDEX })
    const record = makeCreateObj({
      owner: false,
      id,
      context,
    })

    let pId = params

    if (!pId) {
      pId = ''
    }

    const PK = getOneIndexPK('S', pId)
    const SK = id

    const data = {
      ...record,
      ...params,
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
      return { input, data }
    }

    await batchWrite(input)
    return { data }
  } catch (ex) {
    throw new WebinyError(
      ex.message || 'Could not create new page.',
      ex.code || 'CREATE_STOCKING_ERROR',
      ex.data || {
        params,
        stack: ex.stack,
      },
    )
  }
}
