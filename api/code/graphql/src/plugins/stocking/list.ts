import {
  addIndex,
  addLimit,
  addSearch,
  addSort,
  addWhere,
  ListResponse,
  Params,
} from '@m/ultimate/src/util/list'
import WebinyError from '@webiny/error'
import { Context, Entity, OneIndexIndex } from '../type'
import { fromEsRecord, toEsMap } from './esRecord'
import { Stocking, StockingEntity } from './type'

export const listStocking = async (
  params: Params,
  context: Context,
): Promise<ListResponse<Stocking>> => {
  try {
    const { from, limit, search, sort, where } = params

    const body: any = { from }
    addIndex(body, toEsMap[Entity.ES_INDEX], OneIndexIndex.STOCKING)
    addWhere(body, where)
    addSearch(body, toEsMap[StockingEntity.PNAME], search)
    addLimit(body, limit)
    addSort(toEsMap, body, sort)

    console.log('QUERY', body)

    try {
      const res = await context.elasticsearch.search({
        index: OneIndexIndex.ONE_INDEX,
        body,
      })

      const { hits, total } = res.body.hits
      const data = hits.map(item => fromEsRecord(item._source))

      const meta = {
        total: total.value,
      }

      return { data, meta }
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not load pages by given Elasticsearch body.',
        ex.code || 'LIST_STOCKING_ERROR',
        {
          body,
        },
      )
    }
  } catch (ex) {
    throw new WebinyError(
      ex.message || 'Could not list stocking.',
      ex.code || 'LIST_STOCKING_ERROR',
      {
        ...(ex.data || {}),
        params,
      },
    )
  }
}
