import { csvToObjectArray } from '@m/ultimate/src/util/csv'
import WebinyError from '@webiny/error'
import { createBatch } from './create'

interface Params {
  csv: string
}

export const importStocking = async (params: Params, context) => {
  try {
    if (!process.env.DB_TABLE) {
      throw new Error('Missing DB_TABLE')
    }
    if (!process.env.DB_TABLE_ELASTICSEARCH) {
      throw new Error('Missing DB_TABLE_ELASTICSEARCH')
    }

    const { csv } = params

    const { data } = await createBatch(csvToObjectArray(csv), context)

    return data
  } catch (ex) {
    console.log('ERROR', ex)

    throw new WebinyError(
      ex.message || 'Could not import stocking entries.',
      ex.code || 'IMPORT_STOCKING_ERROR',
      ex.data || {
        params,
        stack: ex.stack,
      },
    )
  }
}
