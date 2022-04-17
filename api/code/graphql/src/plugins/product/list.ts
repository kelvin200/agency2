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
import { Product, ProductEntity } from './type'

export const list = async (
  params: Params,
  context: Context,
): Promise<ListResponse<Product>> => {
  try {
    const { from, limit, search, sort, where } = params

    const body: any = { from }
    addIndex(body, toEsMap[Entity.ES_INDEX], OneIndexIndex.PRODUCT)
    addWhere(body, where)
    addSearch(body, toEsMap[ProductEntity.NAME], search)
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
        ex.code || 'LIST_PRODUCT_ERROR',
        {
          body,
        },
      )
    }
  } catch (ex) {
    throw new WebinyError(
      ex.message || 'Could not list products.',
      ex.code || 'LIST_PRODUCT_ERROR',
      {
        ...(ex.data || {}),
        params,
      },
    )
  }
}
