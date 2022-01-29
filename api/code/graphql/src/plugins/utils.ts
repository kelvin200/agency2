import { nanoid } from 'nanoid'
import { EntityPK } from './type'

export const getZeroPaddedVersionNumber = (value: string | number): string => {
  if (typeof value !== 'number') {
    value = Number(value)
  }
  return String(value).padStart(4, '0')
}

export const createId = () => nanoid(10)

export const getIdWithVersion = (id: string, version: number) =>
  `${id}#${getZeroPaddedVersionNumber(version)}`

export const getOneIndexPK = (type: string, id?: string) =>
  typeof id !== 'undefined'
    ? `${EntityPK.ONE_INDEX}#${type}#${id}`
    : `${EntityPK.ONE_INDEX}#${type}`

export const makeEntity = ({
  type,
  createdAt,
  updatedAt,
}: {
  type?: string
  createdAt?: string
  updatedAt?: string
}) => {
  const now = new Date().toISOString()

  return {
    _ct: createdAt || now,
    _md: updatedAt || now,
    _et: type,
  }
}

export const makeCreateObj = ({
  versioning = true,
  createdBy = true,
  owner = true,
  context,
  id = createId(),
}: any) => {
  const identity = context.security.getIdentity()
  const own = identity && {
    id: identity.id,
    displayName: identity.displayName,
    type: identity.type,
  }

  const obj: any = {
    id,
  }

  versioning && (obj.version = 1)
  createdBy && (obj.createdBy = own)
  owner && (obj.owner = own)

  return obj
}

export const validateRequiredFields =
  ({
    requiredFields,
    requiredFieldSets,
  }: {
    requiredFields?: string[]
    requiredFieldSets?: string[][]
  }) =>
  (params = {}, doNotThrow?: boolean) => {
    const er = requiredFields?.filter?.(k => !(k in params))
    if (er && er.length > 0) {
      const e = `[${er.join(', ')}] are required!`
      if (doNotThrow) {
        return e
      }
      throw new Error(e)
    }

    const es = requiredFieldSets?.filter?.(ks => ks.every(k => !(k in params)))
    if (es && es.length > 0) {
      const e = es
        .map(ks => `One of the fields: [${ks.join(', ')}] are required!`)
        .join('\n')
      if (doNotThrow) {
        return e
      }
      throw new Error(e)
    }
  }
