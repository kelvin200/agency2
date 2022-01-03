import pageBuilderDynamoDbElasticsearchPlugins from '@m/api-page-builder-so-ddb-es/src'
import updateSettingsPlugins from '@webiny/api-page-builder/updateSettings'
import { DynamoDbDriver } from '@webiny/db-dynamodb'
import { createHandler } from '@webiny/handler-aws'
import dbPlugins from '@webiny/handler-db'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export const handler = createHandler(
  updateSettingsPlugins(),
  dbPlugins({
    table: process.env.DB_TABLE,
    driver: new DynamoDbDriver({
      documentClient: new DocumentClient({
        convertEmptyValues: true,
        region: process.env.AWS_REGION,
      }),
    }),
  }),
  pageBuilderDynamoDbElasticsearchPlugins(),
)
