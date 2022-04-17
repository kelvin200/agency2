import { record } from '@m/ultimate/src/util/record'

import { Entity, OneIndexIndex } from '../type'
import { ProductEntity } from './type'

export const {
  fromRecord: fromEsRecord,
  toRecord: toEsRecord,
  toRecordWithoutMapping: toEsRecordRaw,
  fieldMapping: toEsMap,
  fieldMappingReversed: fromEsMap,
} = record({
  fields: [
    Entity.ES_INDEX,
    Entity.ID,

    ProductEntity.NAME,
    ProductEntity.TAGS,
    ProductEntity.FLAG,
  ],
  recordMaxSize: 1024,
  mapBefore: d => ({
    ...d,
    esIndex: OneIndexIndex.PRODUCT,
  }),
  mapAfter: d => ({
    ...d,
    index: OneIndexIndex.ONE_INDEX,
  }),
})
