import { record } from '@m/ultimate/src/util/record'
import { Entity, EntityType } from '../type'
import { ProductEntity } from './type'

export const { fromRecord: fromDbRecord, toRecord: toDbRecord } = record({
  fields: [
    Entity.ID,
    Entity.VERSION,
    Entity.OWNER,
    Entity.CREATED_BY,
    Entity.UPDATED_BY,
    Entity.DIFF,

    ProductEntity.NAME,
    ProductEntity.ITEM_WEIGHT,
    ProductEntity.TAGS,
    ProductEntity.FLAG,
  ],
  recordMaxSize: 2048,
  mapAfter: d => ({
    ...d,
    TYPE: EntityType.PRODUCT,
  }),
})
