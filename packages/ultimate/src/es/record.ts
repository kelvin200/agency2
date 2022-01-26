import { record } from '../util/record'

export const { fromRecord: fromEsRecord, toRecord: toEsRecord } = record({
  fieldMapping: {
    esIndex: 'i',
    id: 'a',
    pName: 'b',
    pId: 'c',
    vendor: 'd',
    quantity: 'e',
    expiryDate: 'f',
    'createdBy.displayName': 'g',
    'createdBy.id': 'h',
    'createdBy.type': 'j',
    toLocation: 'k',
    purchaseDate: 'l',
  },
  recordMaxSize: 1024,
})
