import { getElasticsearchOperators } from '@webiny/api-elasticsearch/operators'
import WebinyError from '@webiny/error'
import { ContextPlugin } from '@webiny/handler/plugins/ContextPlugin'
import { Client } from 'elasticsearch'
import { createElasticsearchClient } from './create'
import { ElasticsearchClientOptions, ElasticsearchContext } from './types'

/**
 * We must accept either Elasticsearch client or options that create the client.
 */
export default (
  params: ElasticsearchClientOptions | Client,
): ContextPlugin<ElasticsearchContext> =>
  new ContextPlugin<ElasticsearchContext>(context => {
    if (context.elasticsearch) {
      throw new WebinyError(
        'Elasticsearch client is already initialized, no need to define it again. Check your code for duplicate initializations.',
        'ELASTICSEARCH_ALREADY_INITIALIZED',
      )
    }
    /**
     * Initialize the Elasticsearch client.
     */
    // @ts-ignore
    context.elasticsearch =
      'endpoint' in params ? createElasticsearchClient(params) : params

    context.plugins.register(getElasticsearchOperators())
  })
