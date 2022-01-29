import get from 'lodash/get'
import set from 'lodash/set'

interface Meta {
  total: number
}

export interface ListResponse<T = unknown> {
  data: T[]
  meta: Meta
}

interface ListWhereInput {
  toLocation: string
  vendor: string
  tags: ListWhereTagsInput
}

interface ListWhereTagsInput {
  query: string[]
  rule: string
}

interface ListSearchInput {
  query: string
}

export interface Params {
  where?: ListWhereInput
  limit?: number
  from?: number
  sort?: string[]
  search?: ListSearchInput
}

const sortRegExp = new RegExp(/^([a-zA-Z-0-9_]+)_(ASC|DESC)$/)

export const addSort = (
  toEsMap: Record<string, string>,
  query: any,
  sort?: string[],
) => {
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

      return { [toEsMap[field]]: { order } }
    })
    .filter(Boolean)

  if (_s.length === 0) {
    return
  }

  query.sort = _s
}

export const addLimit = (query: any, limit?: number) => {
  if (typeof limit !== 'number') {
    return
  }
  query.size = Math.min(limit, 100)
}

export const addSearch = (
  query: any,
  field: string,
  search?: ListSearchInput,
) => {
  if (!search?.query || search.query.length < 3) {
    return
  }

  const m = get(query, 'query.bool.must') || []

  m.push({
    match: { [field]: search.query },
  })
  set(query, 'query.bool.must', m)
}

export const addWhere = (query: any, where?: ListWhereInput) => {
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

export const addIndex = (query: any, indexKey: string, indexValue: string) => {
  const f = get(query, 'query.bool.filter') || []

  f.push({
    match: { [indexKey]: indexValue },
  })

  set(query, 'query.bool.filter', f)
}
