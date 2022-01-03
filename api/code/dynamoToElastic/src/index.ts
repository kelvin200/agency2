import elasticsearchClientContext from '@m/api-elasticsearch/src'
import dynamoDBToElastic from '@webiny/api-dynamodb-to-elasticsearch/handler'
import elasticsearchDataGzipCompression from '@webiny/api-elasticsearch/plugins/GzipCompression'
import { createHandler } from '@webiny/handler-aws'

export const handler = createHandler({
  plugins: [
    elasticsearchClientContext({
      endpoint: `https://${process.env.ELASTIC_SEARCH_ENDPOINT}`,
    }),
    elasticsearchDataGzipCompression(),
    dynamoDBToElastic(),
  ],
})
