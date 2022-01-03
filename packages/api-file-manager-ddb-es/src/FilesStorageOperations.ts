import { compress } from '@webiny/api-elasticsearch/compression'
import { decodeCursor, encodeCursor } from '@webiny/api-elasticsearch/cursors'
import { createLimit } from '@webiny/api-elasticsearch/limit'
import defineFilesEsEntity from '@webiny/api-file-manager-ddb-es/definitions/filesElasticsearchEntity'
import defineFilesEntity from '@webiny/api-file-manager-ddb-es/definitions/filesEntity'
import defineTable from '@webiny/api-file-manager-ddb-es/definitions/table'
import defineEsTable from '@webiny/api-file-manager-ddb-es/definitions/tableElasticsearch'
import { configurations } from '@webiny/api-file-manager-ddb-es/operations/configurations'
import { createElasticsearchBody } from '@webiny/api-file-manager-ddb-es/operations/files/body'
import {
  transformFromIndex,
  transformToIndex,
} from '@webiny/api-file-manager-ddb-es/operations/files/transformers'
import { FileIndexTransformPlugin } from '@webiny/api-file-manager-ddb-es/plugins/FileIndexTransformPlugin'
import {
  File,
  FileManagerContext,
  FileManagerFilesStorageOperations,
  FileManagerFilesStorageOperationsCreateBatchParams,
  FileManagerFilesStorageOperationsCreateParams,
  FileManagerFilesStorageOperationsDeleteParams,
  FileManagerFilesStorageOperationsGetParams,
  FileManagerFilesStorageOperationsListParams,
  FileManagerFilesStorageOperationsListResponse,
  FileManagerFilesStorageOperationsTagsParams,
  FileManagerFilesStorageOperationsTagsResponse,
  FileManagerFilesStorageOperationsUpdateParams,
} from '@webiny/api-file-manager/types'
import { batchWriteAll } from '@webiny/db-dynamodb/utils/batchWrite'
import { cleanupItem } from '@webiny/db-dynamodb/utils/cleanup'
import { get as getEntityItem } from '@webiny/db-dynamodb/utils/get'
import WebinyError from '@webiny/error'
import { Entity, Table } from 'dynamodb-toolbox'
import { Client, SearchResponse } from 'elasticsearch'

interface FileItem extends File {
  PK: string
  SK: string
  TYPE: string
}

interface EsFileItem {
  PK: string
  SK: string
  index: string
  data: any
}

interface ConstructorParams {
  context: FileManagerContext
}

interface CreatePartitionKeyParams {
  id: string
  locale: string
  tenant: string
}

export class FilesStorageOperations implements FileManagerFilesStorageOperations {
  private readonly context: FileManagerContext
  private readonly table: Table
  private readonly esTable: Table
  private readonly entity: Entity<any>
  private readonly esEntity: Entity<any>
  private _esIndex: string

  private get esIndex(): string {
    if (!this._esIndex) {
      const { index: esIndex } = configurations.es({
        tenant: this.context.tenancy.getCurrentTenant().id,
      })
      this._esIndex = esIndex
    }
    return this._esIndex
  }

  private get esClient() {
    const ctx = this.context as any
    if (!ctx.elasticsearch) {
      throw new WebinyError(
        'Missing Elasticsearch client on the context.',
        'ELASTICSEARCH_CLIENT_ERROR',
      )
    }
    return ctx.elasticsearch as Client
  }

  public constructor({ context }: ConstructorParams) {
    this.context = context
    this.table = defineTable({
      context,
    })

    this.entity = defineFilesEntity({
      context,
      table: this.table,
    })

    this.esTable = defineEsTable({
      context,
    })

    this.esEntity = defineFilesEsEntity({
      context,
      table: this.esTable,
    })
  }

  public async get(params: FileManagerFilesStorageOperationsGetParams): Promise<File | null> {
    const { where } = params
    const keys = {
      PK: this.createPartitionKey(where),
      SK: this.createSortKey(),
    }

    try {
      const file = await getEntityItem<File>({
        entity: this.entity,
        keys,
      })
      return cleanupItem<File>(this.entity, file)
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not fetch requested file.',
        ex.code || 'GET_FILE_ERROR',
        {
          where,
        },
      )
    }
  }

  public async create(params: FileManagerFilesStorageOperationsCreateParams): Promise<File> {
    const { file } = params

    const keys = {
      PK: this.createPartitionKey(file),
      SK: this.createSortKey(),
    }
    const item: FileItem = {
      ...file,
      ...keys,
      TYPE: 'fm.file',
    }
    const esData = await transformToIndex({
      plugins: this.getFileIndexTransformPlugins(),
      file,
    })
    const esCompressedData = await compress(this.context.plugins, esData)
    const esItem: EsFileItem = {
      ...keys,
      index: this.esIndex,
      data: esCompressedData,
    }
    try {
      await this.entity.put(item)
      await this.esEntity.put(esItem)
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not create a new file in the DynamoDB.',
        ex.code || 'CREATE_FILE_ERROR',
        {
          item,
          esItem,
        },
      )
    }

    return file
  }

  public async update(params: FileManagerFilesStorageOperationsUpdateParams): Promise<File> {
    const { file } = params

    const keys = {
      PK: this.createPartitionKey(file),
      SK: this.createSortKey(),
    }

    const item: FileItem = {
      ...file,
      ...keys,
      TYPE: 'fm.file',
    }
    const esData = await transformToIndex({
      plugins: this.getFileIndexTransformPlugins(),
      file,
    })
    const esCompressedData = await compress(this.context.plugins, esData)
    const esItem: EsFileItem = {
      ...keys,
      index: this.esIndex,
      data: esCompressedData,
    }
    try {
      await this.entity.put(item)
      await this.esEntity.put(esItem)
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not update a file in the DynamoDB.',
        ex.code || 'UPDATE_FILE_ERROR',
        {
          item,
          esItem,
        },
      )
    }
    return file
  }

  public async delete(params: FileManagerFilesStorageOperationsDeleteParams): Promise<void> {
    const { file } = params
    const keys = {
      PK: this.createPartitionKey(file),
      SK: this.createSortKey(),
    }

    try {
      await this.entity.delete(keys)
      await this.esEntity.delete(keys)
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not delete file from the DynamoDB.',
        ex.code || 'DELETE_FILE_ERROR',
        {
          error: ex,
          file,
        },
      )
    }
  }

  public async createBatch(
    params: FileManagerFilesStorageOperationsCreateBatchParams,
  ): Promise<File[]> {
    const { files } = params

    const items = []
    const esItems = []

    for (const file of files) {
      const keys = {
        PK: this.createPartitionKey(file),
        SK: this.createSortKey(),
      }

      items.push(
        this.entity.putBatch({
          ...file,
          ...keys,
          TYPE: 'fm.file',
        }),
      )

      const esCompressedData = await compress(this.context.plugins, file)

      esItems.push(
        this.esEntity.putBatch({
          ...keys,
          index: this.esIndex,
          data: esCompressedData,
        }),
      )
    }

    try {
      await batchWriteAll({
        table: this.entity.table,
        items,
      })
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not batch insert a list of files.',
        ex.code || 'BATCH_CREATE_FILES_ERROR',
        {
          error: ex,
          files,
        },
      )
    }

    try {
      await batchWriteAll({
        table: this.esEntity.table,
        items: esItems,
      })
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not batch insert a list of files into Elasticsearch table.',
        ex.code || 'BATCH_CREATE_FILES_ERROR',
        {
          error: ex,
          files,
        },
      )
    }

    return files
  }

  public async list(
    params: FileManagerFilesStorageOperationsListParams,
  ): Promise<FileManagerFilesStorageOperationsListResponse> {
    const { where, limit, after, sort } = params

    const body = createElasticsearchBody({
      context: this.context,
      where,
      limit,
      sort,
      after,
    })

    let response: SearchResponse<any>
    try {
      response = await this.esClient.search({
        ...configurations.es({
          tenant: this.context.tenancy.getCurrentTenant().id,
        }),
        body,
      })
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Could not search for the files.',
        ex.code || 'FILE_LIST_ERROR',
        {
          where,
          esBody: body,
        },
      )
    }
    const plugins = this.getFileIndexTransformPlugins()
    const { hits, total } = response.hits

    const files = await Promise.all<File>(
      hits.map(async item => {
        return await transformFromIndex({
          plugins,
          file: item._source,
        })
      }),
    )

    let hasMoreItems = false
    if (files.length > limit) {
      files.pop()
      hasMoreItems = true
    }

    const meta = {
      hasMoreItems,
      // @ts-ignore
      totalCount: total.value,
      cursor: files.length > 0 ? encodeCursor(hits[files.length - 1].sort) : null,
    }

    return [files, meta]
  }
  public async tags(
    params: FileManagerFilesStorageOperationsTagsParams,
  ): Promise<FileManagerFilesStorageOperationsTagsResponse> {
    const { where, limit: initialLimit } = params

    const esDefaults = configurations.es({
      tenant: this.context.tenancy.getCurrentTenant().id,
    })

    const must: any[] = []
    if (where.locale) {
      must.push({ term: { 'locale.keyword': where.locale } })
    }

    // When ES index is shared between tenants, we need to filter records by tenant ID
    const sharedIndex = process.env.ELASTICSEARCH_SHARED_INDEXES === 'true'
    if (sharedIndex) {
      const tenant = this.context.tenancy.getCurrentTenant()
      must.push({ term: { 'tenant.keyword': tenant.id } })
    }

    const limit = createLimit(initialLimit)

    const body = {
      query: {
        bool: {
          must,
        },
      },
      size: limit + 1,
      aggs: {
        listTags: {
          terms: { field: 'tags.keyword' },
        },
      },
      search_after: decodeCursor(null),
    }

    let response = undefined

    try {
      response = await this.esClient.search({
        ...esDefaults,
        body,
      })
    } catch (ex) {
      throw new WebinyError(
        ex.message || 'Error in the Elasticsearch query.',
        ex.code || 'ELASTICSEARCH_ERROR',
        {
          body,
        },
      )
    }

    const tags = response.body.aggregations.listTags.buckets.map(item => item.key) || []

    let hasMoreItems = false
    const totalCount = tags.length
    if (totalCount > limit + 1) {
      tags.pop()
      hasMoreItems = true
    }

    const meta = {
      hasMoreItems,
      totalCount,
      cursor: null, //tags.length > 0 ? encodeCursor(hits[files.length - 1].sort) : null
    }

    return [tags, meta]
  }

  private createPartitionKey(params: CreatePartitionKeyParams): string {
    const { tenant, locale, id } = params
    return `T#${tenant}#L#${locale}#FM#F${id}`
  }

  private createSortKey(): string {
    return 'A'
  }

  private getFileIndexTransformPlugins(): FileIndexTransformPlugin[] {
    return this.context.plugins.byType<FileIndexTransformPlugin>(FileIndexTransformPlugin.type)
  }
}
