import { record } from '@m/ultimate/src/util/record'
import { Entity, OneIndexIndex } from '../type'
import { StockingEntity } from './type'

export const {
  fromRecord: fromEsRecord,
  toRecord: toEsRecord,
  toRecordWithoutMapping: toEsRecordRaw,
} = record({
  fields: [
    Entity.ES_INDEX,
    Entity.ID,

    StockingEntity.PID,
    StockingEntity.PNAME,
    StockingEntity.VENDOR,
    StockingEntity.QUANTITY,
    StockingEntity.EXPIRY_DATE,
    StockingEntity.RECEIVED,
    StockingEntity.PAID_BY,
    StockingEntity.PURCHASED_BY,
    StockingEntity.TO_LOCATION,
    StockingEntity.PURCHASE_DATE,
  ],
  recordMaxSize: 1024,
  mapBefore: d => ({
    ...d,
    esIndex: OneIndexIndex.STOCKING,
  }),
  mapAfter: d => ({
    ...d,
    index: OneIndexIndex.ONE_INDEX,
  }),
})
