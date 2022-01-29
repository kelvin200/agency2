export enum StockingEntity {
  PID = 'pId',
  PNAME = 'pName',
  PURCHASE_DATE = 'purchaseDate',
  QUANTITY = 'quantity',
  ITEM_COST = 'itemCost',
  EXTRA_COST = 'extraCost',
  AUD_RATE = 'audRate',
  ITEM_WEIGHT = 'itemWeight',
  VENDOR = 'vendor',
  TO_LOCATION = 'toLocation',
  EXPIRY_DATE = 'expiryDate',
  RECEIVED = 'received',
  RECEIVED_DATE = 'receivedDate',
  TOTAL_VND = 'totalVnd',
  TOTAL_AUD = 'totalAud',
  PAID_BY = 'paidBy',
  PURCHASED_BY = 'purchasedBy',
  FLAG = 'flag',
}

export enum StockingFlag {
  REVIEW_NEEDED = 1,
}

export interface Stocking {
  id: string
  pId: string
  pName: string
  flag?: StockingFlag
}

export interface StockingParams {
  pId?: string
  pName?: string
  flag?: StockingFlag
}
