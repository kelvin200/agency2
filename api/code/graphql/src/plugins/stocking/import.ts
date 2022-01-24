import { csvToObjectArray } from '@m/ultimate/src/util/csv'
import { batchWrite } from '@m/ultimate/src/util/dynamo'
import WebinyError from '@webiny/error'
import { create } from './create'

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

    const input = csvToObjectArray(csv)
      .map(i => create(i, context, true))
      .flat()

    return batchWrite(input).then(() => true)
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
