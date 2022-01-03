import { Client, ConfigOptions } from 'elasticsearch'
import { ElasticsearchClientOptions } from './types'

export const createElasticsearchClient = (options: ElasticsearchClientOptions) => {
  const { endpoint, ...rest } = options

  const clientOptions: ConfigOptions = {
    host: endpoint,
    ...rest,
  }

  return new Client(clientOptions)
}
