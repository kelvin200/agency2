// If using old ES SDK (Not AWS)
import { Client, ConfigOptions } from 'elasticsearch'
import { ElasticsearchClientOptions } from './types'

class MClient {
  private _es: Client
  public bulk: any
  public indices: any
  public cat: any

  constructor(clientOptions: ConfigOptions) {
    this._es = new Client(clientOptions)
    this.bulk = this._es.bulk
    this.indices = this._es.indices
    this.cat = this._es.cat
  }

  async search(a) {
    const r = await this._es.search(a)
    // @ts-ignore
    return r.body ? r : { body: r }
  }
}

export const createElasticsearchClient = (options: ElasticsearchClientOptions) => {
  const { endpoint, ...rest } = options

  return new MClient({
    host: endpoint,
    ...rest,
  })
}
// ------------------

// If using new ES SDK (Not AWS)
// import { Client } from '@elastic/elasticsearch'
// import { ElasticsearchClientOptions } from '@webiny/api-elasticsearch/client'

// export const createElasticsearchClient = (options: ElasticsearchClientOptions) => {
//   const { endpoint, node, ...rest } = options

//   return new Client({
//     node: endpoint || node,
//     ...rest,
//   })
// }
// ------------------

// If using new ES SDK in AWS
// import { Client, ClientOptions } from '@elastic/elasticsearch'
// import { ElasticsearchClientOptions } from '@webiny/api-elasticsearch/client'
// import createAwsElasticsearchConnector from 'aws-elasticsearch-connector'
// import AWS from 'aws-sdk'

// export const createElasticsearchClient = (options: ElasticsearchClientOptions) => {
//   const { endpoint, node, ...rest } = options

//   const clientOptions: ClientOptions = {
//     node: endpoint || node,
//     ...rest,
//   }

//   if (!clientOptions.auth) {
//     /**
//      * If no `auth` configuration is present, we setup AWS connector.
//      */
//     Object.assign(clientOptions, createAwsElasticsearchConnector(AWS.config))
//   }

//   return new Client(clientOptions)
// }
// ------------------
