import { encodeCursor } from '@webiny/api-elasticsearch/cursors'
import { createLimit } from '@webiny/api-elasticsearch/limit'
import { ElasticsearchBoolQueryConfig } from '@webiny/api-elasticsearch/types'
import {
  Page,
  PageStorageOperationsListParams,
  PageStorageOperationsListResponse,
  PageStorageOperationsListTagsParams,
} from '@webiny/api-page-builder/types'
import configurations from '@webiny/api-page-builder-so-ddb-es/operations/configurations'
import { createElasticsearchQueryBody } from '@webiny/api-page-builder-so-ddb-es/operations/pages/elasticsearchQueryBody'
import { PageStorageOperationsDdbEs as _ } from '@webiny/api-page-builder-so-ddb-es/operations/pages/PageStorageOperations'
import { SearchLatestPagesPlugin } from '@webiny/api-page-builder-so-ddb-es/plugins/definitions/SearchLatestPagesPlugin'
import { SearchPagesPlugin } from '@webiny/api-page-builder-so-ddb-es/plugins/definitions/SearchPagesPlugin'
import { SearchPublishedPagesPlugin } from '@webiny/api-page-builder-so-ddb-es/plugins/definitions/SearchPublishedPagesPlugin'
import WebinyError from '@webiny/error'
import { Client, SearchResponse } from 'elasticsearch'

export class PageStorageOperationsDdbEs extends _ {
  public async list(
    params: PageStorageOperationsListParams,
  ): Promise<PageStorageOperationsListResponse> {
    /**
     * We do not allow loading both published and latest at the same time.
     * @see PageStorageOperationsListWhere
     */
    if (params.where.published && params.where.latest) {
      throw new WebinyError(
        'Both published and latest cannot be defined at the same time.',
        'MALFORMED_WHERE_ERROR',
        {
          where: params.where,
        },
      )
    }

    const { after: previousCursor, limit: initialLimit } = params

    const limit = createLimit(initialLimit, 50)
    const body = createElasticsearchQueryBody({
      ...params,
      where: {
        ...params.where,
      },
      limit,
      after: previousCursor,
      context: this.context,
    })

    let plugins: SearchPagesPlugin[] = []
    if (params.where.published) {
      plugins = this.context.plugins.byType<SearchPublishedPagesPlugin>(
        SearchPublishedPagesPlugin.type,
      )
    } else if (params.where.latest) {
      plugins = this.context.plugins.byType<SearchLatestPagesPlugin>(
        SearchLatestPagesPlugin.type,
      )
    } else {
      throw new WebinyError(
        'Only published or latest can be listed. Missing where condition.',
        'MALFORMED_WHERE_ERROR',
        {
          where: params.where,
        },
      )
    }

    for (const plugin of plugins) {
      /**
       * Apply query modifications
       */
      plugin.modifyQuery({
        query: body.query as unknown as ElasticsearchBoolQueryConfig,
        args: params,
        context: this.context,
      })

      /**
       * Apply sort modifications
       */
      plugin.modifySort({
        sort: body.sort,
        args: params,
        context: this.context,
      })
    }

    let response: SearchResponse<Page>
    const esConfig = configurations.es(this.context)
    try {
      response = await (this.elasticsearch as unknown as Client).search({
        ...esConfig,
        body,
      })
    } catch (ex) {
      /**
       * Do not throw the error if Elasticsearch index does not exist.
       * In some CRUDs we try to get list of pages but index was not created yet.
       */
      if (ex.message === 'index_not_found_exception') {
        return {
          items: [],
          meta: {
            hasMoreItems: false,
            totalCount: 0,
            cursor: null,
          },
        }
      }
      throw new WebinyError(
        ex.message || 'Could not load pages by given Elasticsearch body.',
        ex.code || 'LIST_PAGES_ERROR',
        {
          body,
        },
      )
    }
    const { hits, total } = response.hits
    const items = hits.map(item => item._source)

    const hasMoreItems = items.length > limit
    if (hasMoreItems) {
      /**
       * Remove the last item from results, we don't want to include it.
       */
      items.pop()
    }
    /**
     * Cursor is the `sort` value of the last item in the array.
     * https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after
     */
    const cursor =
      items.length > 0 && hasMoreItems
        ? encodeCursor(hits[items.length - 1].sort)
        : null
    return {
      items,
      meta: {
        hasMoreItems,
        // @ts-ignore
        totalCount: total.value,
        cursor,
      },
    }
  }

  public async listTags(
    params: PageStorageOperationsListTagsParams,
  ): Promise<string[]> {
    const { where } = params

    const tenant: string = where.tenant
    const body = createElasticsearchQueryBody({
      ...params,
      where: {
        locale: where.locale,
        search: undefined,
        tenant,
      },
      sort: [],
      limit: 100000,
      context: this.context,
    })

    const esConfig = configurations.es(this.context)

    try {
      const response = await (this.elasticsearch as unknown as Client).search({
        ...esConfig,
        body: {
          ...body,
          sort: undefined,
          limit: undefined,
          size: 0,
          aggs: {
            tags: {
              terms: {
                field: 'tags.keyword',
                include: `.*${where.search}.*`,
                size: 10,
              },
            },
          },
        },
      })
      return response.aggregations.tags.buckets.map(item => item.key)
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not list tags by given parameters.',
        ex.code || 'LIST_TAGS_ERROR',
        {
          body,
          where,
        },
      )
    }
  }
  u
}
