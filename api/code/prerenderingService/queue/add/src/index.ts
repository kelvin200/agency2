import queueAddPlugins from '@webiny/api-prerendering-service/queue/add'
import { createPrerenderingServiceStorageOperations } from '@webiny/api-prerendering-service-so-ddb'
import { createHandler } from '@webiny/handler-aws'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const documentClient = new DocumentClient({
  convertEmptyValues: true,
  region: process.env.AWS_REGION,
})

export const handler = createHandler(
  queueAddPlugins({
    storageOperations: createPrerenderingServiceStorageOperations({
      table: table => {
        return {
          ...table,
          name: process.env.DB_TABLE,
        }
      },
      documentClient,
    }),
  }),
)
