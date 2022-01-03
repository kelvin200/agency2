import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'
import vpc from './vpc'

class ElasticSearch {
  url: string
  table: aws.dynamodb.Table
  role: aws.iam.Role

  constructor({ protectedEnvironment }: { protectedEnvironment: boolean }) {
    /**
     * Create a table for Elasticsearch records. All ES records are stored in this table to dramatically improve
     * performance and stability on write operations (especially massive data imports). This table also serves as a backup and
     * a single source of truth for your Elasticsearch domain. Streaming is enabled on this table, and it will
     * allow asynchronous synchronization of data with Elasticsearch domain.
     */
    this.url = String(process.env.ES_HOST_URL)

    this.table = new aws.dynamodb.Table(
      'webiny-es',
      {
        attributes: [
          { name: 'PK', type: 'S' },
          { name: 'SK', type: 'S' },
        ],
        streamEnabled: true,
        streamViewType: 'NEW_AND_OLD_IMAGES',
        billingMode: 'PAY_PER_REQUEST',
        hashKey: 'PK',
        rangeKey: 'SK',
      },
      { protect: protectedEnvironment },
    )

    const roleName = 'dynamo-to-elastic-lambda-role'

    this.role = new aws.iam.Role(roleName, {
      assumeRolePolicy: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
            Effect: 'Allow',
          },
        ],
      },
    })

    new aws.iam.RolePolicyAttachment(`${roleName}-AWSLambdaVPCAccessExecutionRole`, {
      role: this.role,
      policyArn: aws.iam.ManagedPolicy.AWSLambdaVPCAccessExecutionRole,
    })

    new aws.iam.RolePolicyAttachment(`${roleName}-AWSLambdaDynamoDBExecutionRole`, {
      role: this.role,
      policyArn: aws.iam.ManagedPolicy.AWSLambdaDynamoDBExecutionRole,
    })

    /**
     * This Lambda will process the stream events from DynamoDB table that contains Elasticsearch items.
     * Elasticsearch can't take large amount of individual writes in a short period of time, so this way
     * we store data for Elasticsearch in a DynamoDB table, and asynchronously insert it into Elasticsearch
     * using batching.
     */
    const streamTarget = new aws.lambda.Function('dynamo-to-elastic', {
      role: this.role.arn,
      runtime: 'nodejs14.x',
      handler: 'handler.handler',
      timeout: 600,
      memorySize: 512,
      environment: {
        variables: {
          DEBUG: String(process.env.DEBUG),
          ELASTIC_SEARCH_ENDPOINT: this.url,
        },
      },
      description: 'Process DynamoDB Stream.',
      code: new pulumi.asset.AssetArchive({
        '.': new pulumi.asset.FileArchive('../code/dynamoToElastic/build'),
      }),
      vpcConfig: {
        subnetIds: vpc.subnets.private.map(subNet => subNet.id),
        securityGroupIds: [vpc.vpc.defaultSecurityGroupId],
      },
    })

    new aws.lambda.EventSourceMapping('dynamo-to-elastic', {
      eventSourceArn: this.table.streamArn,
      functionName: streamTarget.arn,
      startingPosition: 'LATEST',
      maximumRetryAttempts: 3,
      batchSize: 1000,
      maximumBatchingWindowInSeconds: 1,
    })
  }
}

export default ElasticSearch
