import { createElasticsearchClient } from '@m/api-elasticsearch/src/create'
import elasticsearchDataGzipCompression from '@webiny/api-elasticsearch/plugins/GzipCompression'
import {
  createContentHeadlessCmsContext,
  createContentHeadlessCmsGraphQL,
} from '@webiny/api-headless-cms'
import headlessCmsModelFieldToGraphQLPlugins from '@webiny/api-headless-cms/content/plugins/graphqlFields'
import { createStorageOperations as createHeadlessCmsStorageOperations } from '@webiny/api-headless-cms-ddb-es'
import i18nPlugins from '@webiny/api-i18n/graphql'
import i18nContentPlugins from '@webiny/api-i18n-content/plugins'
import i18nDynamoDbStorageOperations from '@webiny/api-i18n-ddb'
import { DynamoDbDriver } from '@webiny/db-dynamodb'
import { createHandler } from '@webiny/handler-aws'
import dbPlugins from '@webiny/handler-db'
import logsPlugins from '@webiny/handler-logs'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

// Imports plugins created via scaffolding utilities.
import scaffoldsPlugins from './plugins/scaffolds'
import securityPlugins from './security'

const debug = process.env.DEBUG === 'true'

const documentClient = new DocumentClient({
  convertEmptyValues: true,
  region: process.env.AWS_REGION,
})

const elasticsearch = createElasticsearchClient({
  endpoint: `https://${process.env.ELASTIC_SEARCH_ENDPOINT}`,
})

export const handler = createHandler({
  plugins: [
    logsPlugins(),
    dbPlugins({
      table: process.env.DB_TABLE,
      driver: new DynamoDbDriver({ documentClient }),
    }),
    securityPlugins({ documentClient }),
    i18nPlugins(),
    i18nDynamoDbStorageOperations(),
    i18nContentPlugins(),
    createContentHeadlessCmsGraphQL({
      debug,
    }),
    createContentHeadlessCmsContext({
      storageOperations: createHeadlessCmsStorageOperations({
        documentClient,
        // @ts-ignore
        elasticsearch,
        modelFieldToGraphQLPlugins: headlessCmsModelFieldToGraphQLPlugins(),
        plugins: [elasticsearchDataGzipCompression()],
      }),
    }),
    scaffoldsPlugins(),
  ],
  http: { debug },
})
