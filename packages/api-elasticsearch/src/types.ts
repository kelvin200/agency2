import { ContextInterface } from '@webiny/handler/types'
import { Client, ConfigOptions } from 'elasticsearch'

export interface ElasticsearchClientOptions extends ConfigOptions {
  endpoint: string
}
export interface ElasticsearchContext extends ContextInterface {
  elasticsearch: Client
}
