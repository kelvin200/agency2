export enum ProductEntity {
  NAME = 'name',
  TAGS = 'tags',
  ITEM_WEIGHT = 'itemWeight',
  FLAG = 'flag',
}

export enum ProductFlag {
  REVIEW_NEEDED = 1,
}

export interface Product {
  id: string
  name: string
  tags?: string[]
  itemWeight?: number
  flag?: ProductFlag
}
