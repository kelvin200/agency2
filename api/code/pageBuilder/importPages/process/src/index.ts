import elasticSearch from '@m/api-elasticsearch/src'
import pageBuilderDynamoDbElasticsearchPlugins from '@m/api-page-builder-so-ddb-es/src'
import fileManagerDynamoDbElasticStorageOperation from '@webiny/api-file-manager-ddb-es'
import fileManagerS3 from '@webiny/api-file-manager-s3'
import fileManagerPlugins from '@webiny/api-file-manager/plugins'
import i18nContentPlugins from '@webiny/api-i18n-content/plugins'
import i18nDynamoDbStorageOperations from '@webiny/api-i18n-ddb'
import i18nPlugins from '@webiny/api-i18n/graphql'
import { createStorageOperations as createPageBuilderStorageOperations } from '@webiny/api-page-builder-import-export-so-ddb'
import pageBuilderImportExportPlugins from '@webiny/api-page-builder-import-export/graphql'
import importPagesProcessPlugins from '@webiny/api-page-builder-import-export/importPages/process'
import pageBuilderPlugins from '@webiny/api-page-builder/graphql'
import { DynamoDbDriver } from '@webiny/db-dynamodb'
import dynamoDbPlugins from '@webiny/db-dynamodb/plugins'
import { createHandler } from '@webiny/handler-aws'
import dbPlugins from '@webiny/handler-db'
import logsPlugins from '@webiny/handler-logs'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import securityPlugins from './security'

const documentClient = new DocumentClient({
  convertEmptyValues: true,
  region: process.env.AWS_REGION,
})

const debug = process.env.DEBUG === 'true'

export const handler = createHandler({
  plugins: [
    dynamoDbPlugins(),
    logsPlugins(),
    elasticSearch({ endpoint: `https://${process.env.ELASTIC_SEARCH_ENDPOINT}` }),
    dbPlugins({
      table: process.env.DB_TABLE,
      driver: new DynamoDbDriver({
        documentClient,
      }),
    }),
    securityPlugins({ documentClient }),
    i18nPlugins(),
    i18nDynamoDbStorageOperations(),
    i18nContentPlugins(),
    fileManagerPlugins(),
    fileManagerDynamoDbElasticStorageOperation(),
    // Add File storage S3 plugin for API file manager.
    fileManagerS3(),
    pageBuilderPlugins(),
    pageBuilderDynamoDbElasticsearchPlugins(),
    pageBuilderImportExportPlugins({
      storageOperations: createPageBuilderStorageOperations({ documentClient }),
    }),
    importPagesProcessPlugins({
      handlers: { process: process.env.AWS_LAMBDA_FUNCTION_NAME },
    }),
  ],
  http: { debug },
})
