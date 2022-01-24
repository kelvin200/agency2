import type { MClient } from '@m/api-elasticsearch/src/create'
import WebinyError from '@webiny/error'
import get from 'lodash/get'
import set from 'lodash/set'

interface Meta {
  total: number
}

interface Stocking {
  id: string
  name: string
  vendor: string
  toLocation: string
  quantity: number
  expiryDate: string
}

interface StockingListResponse {
  items: Stocking[]
  meta: Meta
}

interface Context {
  elasticsearch: MClient
}

interface ListStockingInput {
  toLocation: string
  vendor: string
  tags: ListStockingWhereTagsInput
}

interface ListStockingWhereTagsInput {
  query: string[]
  rule: string
}

interface ListStockingSearchInput {
  query: string
}

interface Params {
  where: ListStockingInput
  limit: number
  from: number
  sort: string[]
  search: ListStockingSearchInput
}

const sortRegExp = new RegExp(/^([a-zA-Z-0-9_]+)_(ASC|DESC)$/)

const addSort = (query: any, sort?: string[]) => {
  if (!sort) {
    return
  }

  const _s = sort
    .map(s => {
      const match = s.match(sortRegExp)

      if (!match) {
        return
      }

      const [, field, initialOrder] = match
      const order = initialOrder.toLowerCase() === 'asc' ? 'asc' : 'desc'

      return { [field]: { order } }
    })
    .filter(Boolean)

  if (_s.length === 0) {
    return
  }

  query.sort = sort
}

const addLimit = (query: any, limit?: number) => {
  if (typeof limit !== 'number') {
    return
  }
  query.limit = Math.min(limit, 100)
}

const addSearch = (query: any, field: string, search?: ListStockingSearchInput) => {
  if (!search?.query || search.query.length < 3) {
    return
  }

  set(query, `query.match.${field}.query`, search.query)
}

const addWhere = (query: any, where?: ListStockingInput) => {
  if (!where) {
    return
  }

  const f = get(query, 'query.bool.filter') || []

  if (where.vendor) {
    f.push({
      term: { vendor: where.vendor },
    })
  }

  if (where.toLocation) {
    f.push({
      term: { toLocation: where.toLocation },
    })
  }

  if (where.tags?.query && where.tags.query.length > 0) {
    if (where.tags.rule === 'any') {
      f.push({
        term: { tags: where.tags },
      })
    } else {
      let m = get(query, 'query.bool.must') || []
      m = m.concat(
        where.tags.query.map(tag => ({
          term: {
            'tags.keyword': tag,
          },
        })),
      )

      set(query, 'query.bool.must', m)
    }
  }

  set(query, 'query.bool.filter', f)
}

export const listStocking = async (params: Params, context: Context) => {
  try {
    const { from, limit, search, sort, where } = params

    const body: any = {
      from,
      query: {
        bool: {
          filter: [
            {
              term: { cid: 'athena-stocking' },
            },
          ],
        },
      },
    }
    addWhere(body, where)
    addSearch(body, 'name', search)
    addLimit(body, limit)
    addSort(body, sort)

    console.log('QUERY', body)

    try {
      const res = await context.elasticsearch.search({ index: 'one-index', body })

      const { hits, total } = res.body.hits
      const items = hits.map(item => item._source)

      const meta = {
        total: total.value,
      }

      return { items, meta }
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
      ex.message || 'Could not list latest pages.',
      ex.code || 'LIST_STOCKING_ERROR',
      {
        ...(ex.data || {}),
        params,
      },
    )
  }
}
