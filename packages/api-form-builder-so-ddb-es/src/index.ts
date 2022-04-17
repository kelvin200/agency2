import { getElasticsearchOperators } from '@webiny/api-elasticsearch/operators'
import { createElasticsearchEntity } from '@webiny/api-form-builder-so-ddb-es/definitions/elasticsearch'
import { createFormEntity } from '@webiny/api-form-builder-so-ddb-es/definitions/form'
import { createSettingsEntity } from '@webiny/api-form-builder-so-ddb-es/definitions/settings'
import { createSubmissionEntity } from '@webiny/api-form-builder-so-ddb-es/definitions/submission'
import { createSystemEntity } from '@webiny/api-form-builder-so-ddb-es/definitions/system'
import { createTable } from '@webiny/api-form-builder-so-ddb-es/definitions/table'
import { createElasticsearchTable } from '@webiny/api-form-builder-so-ddb-es/definitions/tableElasticsearch'
import formElasticsearchFields from '@webiny/api-form-builder-so-ddb-es/operations/form/elasticsearchFields'
import { createSettingsStorageOperations } from '@webiny/api-form-builder-so-ddb-es/operations/settings'
import submissionElasticsearchFields from '@webiny/api-form-builder-so-ddb-es/operations/submission/elasticsearchFields'
import { createSystemStorageOperations } from '@webiny/api-form-builder-so-ddb-es/operations/system'
import { createElasticsearchIndex } from '@webiny/api-form-builder-so-ddb-es/operations/system/createElasticsearchIndex'
import {
  ENTITIES,
  FormBuilderStorageOperationsFactory,
} from '@webiny/api-form-builder-so-ddb-es/types'
import dynamoDbValueFilters from '@webiny/db-dynamodb/plugins/filters'
import WebinyError from '@webiny/error'
import { PluginsContainer } from '@webiny/plugins'

import { createFormStorageOperations } from './operations-form'
import { createSubmissionStorageOperations } from './operations-submission'

// import upgrade5160 from "@webiny/api-form-builder-so-ddb-es/upgrades/5.16.0";

const reservedFields = [
  'PK',
  'SK',
  'index',
  'data',
  'TYPE',
  '__type',
  'GSI1_PK',
  'GSI1_SK',
]

const isReserved = (name: string): void => {
  if (reservedFields.includes(name) === false) {
    return
  }
  throw new WebinyError(
    `Attribute name "${name}" is not allowed.`,
    'ATTRIBUTE_NOT_ALLOWED',
    {
      name,
    },
  )
}

export const createFormBuilderStorageOperations: FormBuilderStorageOperationsFactory =
  params => {
    const {
      attributes = {},
      table: tableName,
      esTable: esTableName,
      documentClient,
      elasticsearch,
      plugins: pluginsInput,
    } = params

    if (attributes) {
      Object.values(attributes).forEach(attrs => {
        Object.keys(attrs).forEach(isReserved)
      })
    }

    const plugins = new PluginsContainer([
      /**
       * User defined plugins.
       */
      pluginsInput || [],
      /**
       * Elasticsearch field definitions for the submission record.
       */
      submissionElasticsearchFields(),
      /**
       * Elasticsearch field definitions for the form record.
       */
      formElasticsearchFields(),
      /**
       * DynamoDB filter plugins for the where conditions.
       */
      dynamoDbValueFilters(),
      /**
       * Elasticsearch operators.
       */
      getElasticsearchOperators(),
    ])

    const table = createTable({
      tableName,
      documentClient,
    })

    const esTable = createElasticsearchTable({
      tableName: esTableName,
      documentClient,
    })

    const entities = {
      /**
       * Regular entities.
       */
      form: createFormEntity({
        entityName: ENTITIES.FORM,
        table,
        attributes: attributes[ENTITIES.FORM],
      }),
      submission: createSubmissionEntity({
        entityName: ENTITIES.SUBMISSION,
        table,
        attributes: attributes[ENTITIES.SUBMISSION],
      }),
      system: createSystemEntity({
        entityName: ENTITIES.SYSTEM,
        table,
        attributes: attributes[ENTITIES.SYSTEM],
      }),
      settings: createSettingsEntity({
        entityName: ENTITIES.SETTINGS,
        table,
        attributes: attributes[ENTITIES.SETTINGS],
      }),
      /**
       * Elasticsearch entities.
       */
      esForm: createElasticsearchEntity({
        entityName: ENTITIES.ES_FORM,
        table: esTable,
        attributes: attributes[ENTITIES.ES_FORM],
      }),
      esSubmission: createElasticsearchEntity({
        entityName: ENTITIES.ES_SUBMISSION,
        table: esTable,
        attributes: attributes[ENTITIES.ES_SUBMISSION],
      }),
    }

    return {
      init: async formBuilder => {
        formBuilder.onAfterInstall.subscribe(async ({ tenant }) => {
          await createElasticsearchIndex({
            elasticsearch,
            tenant,
          })
        })
      },
      // upgrade: upgrade5160(),
      getTable: () => table,
      getEsTable: () => esTable,
      getEntities: () => entities,
      ...createSystemStorageOperations({
        table,
        entity: entities.system,
      }),
      ...createSettingsStorageOperations({
        table,
        entity: entities.settings,
      }),
      ...createFormStorageOperations({
        // @ts-ignore
        elasticsearch,
        table,
        entity: entities.form,
        esEntity: entities.esForm,
        plugins,
      }),
      ...createSubmissionStorageOperations({
        // @ts-ignore
        elasticsearch,
        table,
        entity: entities.submission,
        esEntity: entities.esSubmission,
        plugins,
      }),
    }
  }
