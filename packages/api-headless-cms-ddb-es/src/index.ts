import { getElasticsearchOperators } from '@webiny/api-elasticsearch/operators'
import { createEntryEntity } from '@webiny/api-headless-cms-ddb-es/definitions/entry'
import { createEntryElasticsearchEntity } from '@webiny/api-headless-cms-ddb-es/definitions/entryElasticsearch'
import { createGroupEntity } from '@webiny/api-headless-cms-ddb-es/definitions/group'
import { createModelEntity } from '@webiny/api-headless-cms-ddb-es/definitions/model'
import { createSettingsEntity } from '@webiny/api-headless-cms-ddb-es/definitions/settings'
import { createSystemEntity } from '@webiny/api-headless-cms-ddb-es/definitions/system'
import { createTable } from '@webiny/api-headless-cms-ddb-es/definitions/table'
import { createElasticsearchTable } from '@webiny/api-headless-cms-ddb-es/definitions/tableElasticsearch'
import dynamoDbPlugins from '@webiny/api-headless-cms-ddb-es/dynamoDb'
import elasticsearchPlugins from '@webiny/api-headless-cms-ddb-es/elasticsearch'
import { createEntriesStorageOperations } from '@webiny/api-headless-cms-ddb-es/operations/entry'
import { elasticsearchFields as cmsEntryElasticsearchFields } from '@webiny/api-headless-cms-ddb-es/operations/entry/elasticsearchFields'
import { createGroupsStorageOperations } from '@webiny/api-headless-cms-ddb-es/operations/group'
import { createModelsStorageOperations } from '@webiny/api-headless-cms-ddb-es/operations/model'
import { createSettingsStorageOperations } from '@webiny/api-headless-cms-ddb-es/operations/settings'
import { createSystemStorageOperations } from '@webiny/api-headless-cms-ddb-es/operations/system'
import { createElasticsearchTemplate } from '@webiny/api-headless-cms-ddb-es/operations/system/createElasticsearchTemplate'
import { ENTITIES, StorageOperationsFactory } from '@webiny/api-headless-cms-ddb-es/types'
import { HeadlessCms } from '@webiny/api-headless-cms/types'
import dynamoDbValueFilters from '@webiny/db-dynamodb/plugins/filters'
import { PluginsContainer } from '@webiny/plugins'

export const createStorageOperations: StorageOperationsFactory = params => {
  const {
    attributes = {},
    table,
    esTable,
    documentClient,
    elasticsearch,
    plugins: customPlugins,
    modelFieldToGraphQLPlugins,
  } = params

  const tableInstance = createTable({
    table,
    documentClient,
  })
  const tableElasticsearchInstance = createElasticsearchTable({
    table: esTable,
    documentClient,
  })

  const entities = {
    settings: createSettingsEntity({
      entityName: ENTITIES.SETTINGS,
      table: tableInstance,
      attributes: attributes[ENTITIES.SETTINGS],
    }),
    system: createSystemEntity({
      entityName: ENTITIES.SYSTEM,
      table: tableInstance,
      attributes: attributes[ENTITIES.SYSTEM],
    }),
    groups: createGroupEntity({
      entityName: ENTITIES.GROUPS,
      table: tableInstance,
      attributes: attributes[ENTITIES.GROUPS],
    }),
    models: createModelEntity({
      entityName: ENTITIES.MODELS,
      table: tableInstance,
      attributes: attributes[ENTITIES.MODELS],
    }),
    entries: createEntryEntity({
      entityName: ENTITIES.ENTRIES,
      table: tableInstance,
      attributes: attributes[ENTITIES.ENTRIES],
    }),
    entriesEs: createEntryElasticsearchEntity({
      entityName: ENTITIES.ENTRIES_ES,
      table: tableElasticsearchInstance,
      attributes: attributes[ENTITIES.ENTRIES_ES],
    }),
  }

  const plugins = new PluginsContainer([
    /**
     * User defined custom plugins.
     */
    ...(customPlugins || []),
    /**
     * Plugins of type CmsModelFieldToGraphQLPlugin.
     */
    modelFieldToGraphQLPlugins,
    /**
     * Elasticsearch field definitions for the entry record.
     */
    cmsEntryElasticsearchFields,
    /**
     * DynamoDB filter plugins for the where conditions.
     */
    dynamoDbValueFilters(),
    /**
     * Elasticsearch operators.
     */
    getElasticsearchOperators(),
    /**
     * Field plugins for DynamoDB.
     */
    dynamoDbPlugins(),
    /**
     * Field plugins for Elasticsearch.
     */
    elasticsearchPlugins(),
  ])

  return {
    init: async (cms: HeadlessCms) => {
      cms.onBeforeSystemInstall.subscribe(async () => {
        await createElasticsearchTemplate({
          elasticsearch,
        })
      })
    },
    plugins: [
      /**
       * Field plugins for DynamoDB.
       * We must pass them to the base application.
       */
      dynamoDbPlugins(),
    ],
    getEntities: () => entities,
    getTable: () => tableInstance,
    getEsTable: () => tableElasticsearchInstance,
    system: createSystemStorageOperations({
      entity: entities.system,
    }),
    settings: createSettingsStorageOperations({
      entity: entities.settings,
    }),
    groups: createGroupsStorageOperations({
      entity: entities.groups,
      plugins,
    }),
    models: createModelsStorageOperations({
      entity: entities.models,
      elasticsearch,
    }),
    entries: createEntriesStorageOperations({
      entity: entities.entries,
      esEntity: entities.entriesEs,
      plugins,
      elasticsearch,
    }),
  }
}
