import elasticsearchClientContext from '@m/api-elasticsearch/src'
import elasticsearchDataGzipCompression from '@webiny/api-elasticsearch/plugins/GzipCompression'
import { createHandler } from '@webiny/handler-aws'
import { dynamoDBToElastic } from './dynamodb-to-elastic'

export const handler = createHandler({
  plugins: [
    elasticsearchClientContext({
      endpoint: `https://${process.env.ELASTIC_SEARCH_ENDPOINT}`,
    }),
    elasticsearchDataGzipCompression(),
    dynamoDBToElastic(),
  ],
})
