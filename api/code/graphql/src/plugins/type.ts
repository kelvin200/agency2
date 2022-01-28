import type { WriteRequest } from '@m/ultimate/src/util/dynamo'

export type Create =
  | (<T = unknown>(
      params,
      context,
      returnForBatch: true,
    ) => Promise<{ input: WriteRequest[]; data: T }>)
  | (<T = unknown>(
      params,
      context,
      returnForBatch?: false,
    ) => Promise<{ data: T }>)

export enum OneIndexIndex {
  STOCKING = 's',
  PRODUCT = 'p',
  ONE_INDEX = 'o',
}

export enum EntityType {
  ONE_INDEX = 'OI',
  STOCKING = 'o.s',
  PRODUCT = 'o.p',
}

export enum EntityPK {
  ONE_INDEX = 'O',
  STOCKING = 'S',
  PRODUCT = 'P',
}

export enum Entity {
  ID = 'id',
  VERSION = 'version',
  OWNER = 'owner',
  CREATED_BY = 'createdBy',
  UPDATED_BY = 'updatedBy',
  OWNER_NAME = 'owner.displayName',
  OWNER_ID = 'owner.id',
  OWNER_TYPE = 'owner.type',
  CREATED_BY_NAME = 'createdBy.displayName',
  CREATED_BY_ID = 'createdBy.id',
  CREATED_BY_TYPE = 'createdBy.type',
  UPDATED_BY_NAME = 'updatedBy.displayName',
  UPDATED_BY_ID = 'updatedBy.id',
  UPDATED_BY_TYPE = 'updatedBy.type',
  DIFF = 'diff',
  ES_INDEX = 'esIndex',
}
