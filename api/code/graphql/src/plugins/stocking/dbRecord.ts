import { record } from '@m/ultimate/src/util/record'
import { Entity, EntityType } from '../type'
import { StockingEntity } from './type'

export const { fromRecord: fromDbRecord, toRecord: toDbRecord } = record({
  fields: [
    Entity.ID,
    Entity.VERSION,
    Entity.OWNER,
    Entity.CREATED_BY,
    Entity.UPDATED_BY,
    Entity.DIFF,

    StockingEntity.PID,
    StockingEntity.PNAME,
    StockingEntity.PURCHASE_DATE,
    StockingEntity.PURCHASED_BY,
    StockingEntity.PAID_BY,
    StockingEntity.QUANTITY,
    StockingEntity.ITEM_COST,
    StockingEntity.EXTRA_COST,
    StockingEntity.AUD_RATE,
    StockingEntity.ITEM_WEIGHT,
    StockingEntity.VENDOR,
    StockingEntity.TO_LOCATION,
    StockingEntity.EXPIRY_DATE,
    StockingEntity.RECEIVED,
    StockingEntity.RECEIVED_DATE,
    StockingEntity.TOTAL_VND,
    StockingEntity.TOTAL_AUD,
    StockingEntity.FLAG,
  ],
  recordMaxSize: 1024,
  mapAfter: d => ({
    ...d,
    TYPE: EntityType.STOCKING,
  }),
})
