// Override
import elasticsearchClientContext from '@m/api-elasticsearch/src'
import { createElasticsearchClient } from '@m/api-elasticsearch/src/create'
import pageBuilderDynamoDbElasticsearchPlugins from '@m/api-page-builder-so-ddb-es/src'
import elasticsearchDataGzipCompression from '@webiny/api-elasticsearch/plugins/GzipCompression'
import fileManagerDynamoDbElasticStorageOperation from '@webiny/api-file-manager-ddb-es'
import fileManagerS3 from '@webiny/api-file-manager-s3'
import fileManagerPlugins from '@webiny/api-file-manager/plugins'
import { createFormBuilder } from '@webiny/api-form-builder'
import { createFormBuilderStorageOperations } from '@webiny/api-form-builder-so-ddb-es'
import {
  createAdminHeadlessCmsContext,
  createAdminHeadlessCmsGraphQL,
} from '@webiny/api-headless-cms'
import { createStorageOperations as createHeadlessCmsStorageOperations } from '@webiny/api-headless-cms-ddb-es'
import headlessCmsModelFieldToGraphQLPlugins from '@webiny/api-headless-cms/content/plugins/graphqlFields'
import i18nContentPlugins from '@webiny/api-i18n-content/plugins'
import i18nDynamoDbStorageOperations from '@webiny/api-i18n-ddb'
import i18nPlugins from '@webiny/api-i18n/graphql'
import { createStorageOperations as createPageImportExportStorageOperations } from '@webiny/api-page-builder-import-export-so-ddb'
import pageBuilderImportExportPlugins from '@webiny/api-page-builder-import-export/graphql'
import pageBuilderPlugins from '@webiny/api-page-builder/graphql'
import pageBuilderPrerenderingPlugins from '@webiny/api-page-builder/prerendering'
import prerenderingServicePlugins from '@webiny/api-prerendering-service/client'
import { DynamoDbDriver } from '@webiny/db-dynamodb'
import dynamoDbPlugins from '@webiny/db-dynamodb/plugins'
import { createHandler } from '@webiny/handler-aws'
import dbPlugins from '@webiny/handler-db'
import graphqlPlugins from '@webiny/handler-graphql'
import logsPlugins from '@webiny/handler-logs'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import overridePlugins from './plugins'
import securityPlugins from './security'

const debug = process.env.DEBUG === 'true'

const documentClient = new DocumentClient({
  convertEmptyValues: true,
  region: process.env.AWS_REGION,
})

const elasticsearchClient = createElasticsearchClient({
  endpoint: `https://${process.env.ELASTIC_SEARCH_ENDPOINT}`,
})

export const handler = createHandler({
  plugins: [
    dynamoDbPlugins(),
    logsPlugins(),
    graphqlPlugins({ debug }),
    // @ts-ignore
    elasticsearchClientContext(elasticsearchClient),
    dbPlugins({
      table: process.env.DB_TABLE,
      driver: new DynamoDbDriver({ documentClient }),
    }),
    securityPlugins({ documentClient }),
    i18nPlugins(),
    i18nDynamoDbStorageOperations(),
    i18nContentPlugins(),
    fileManagerPlugins(),
    fileManagerDynamoDbElasticStorageOperation(),
    fileManagerS3(),
    prerenderingServicePlugins({
      handlers: {
        render: process.env.PRERENDERING_RENDER_HANDLER,
        flush: process.env.PRERENDERING_FLUSH_HANDLER,
        queue: {
          add: process.env.PRERENDERING_QUEUE_ADD_HANDLER,
          process: process.env.PRERENDERING_QUEUE_PROCESS_HANDLER,
        },
      },
    }),
    pageBuilderPlugins(),
    pageBuilderDynamoDbElasticsearchPlugins(),
    pageBuilderPrerenderingPlugins(),
    pageBuilderImportExportPlugins({
      storageOperations: createPageImportExportStorageOperations({
        documentClient,
      }),
    }),
    createFormBuilder({
      storageOperations: createFormBuilderStorageOperations({
        documentClient,
        // @ts-ignore
        elasticsearch: elasticsearchClient,
      }),
    }),
    createAdminHeadlessCmsContext({
      storageOperations: createHeadlessCmsStorageOperations({
        documentClient,
        // @ts-ignore
        elasticsearch: elasticsearchClient,
        modelFieldToGraphQLPlugins: headlessCmsModelFieldToGraphQLPlugins(),
        plugins: [elasticsearchDataGzipCompression()],
      }),
    }),
    createAdminHeadlessCmsGraphQL(),
    elasticsearchDataGzipCompression(),

    // Override
    overridePlugins(),
  ],
  http: { debug },
})
