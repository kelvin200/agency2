import mdbid from 'mdbid'

export const getZeroPaddedVersionNumber = (value: string | number): string => {
  if (typeof value !== 'number') {
    value = Number(value)
  }
  return String(value).padStart(4, '0')
}

export const createId = mdbid

export const getIdWithVersion = (id: string, version: number) =>
  `${id}#${getZeroPaddedVersionNumber(version)}`

export const getOneIndexPK = (type: string, id: string) =>
  `T#root#L#en-AU#OI#${type}#${id}`

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
  const own = {
    id: identity.id,
    displayName: identity.displayName,
    type: identity.type,
  }

  const obj: any = {
    id,
  }

  if (versioning) {
    obj.version = 1
    obj.id = getIdWithVersion(id, 1)
  }
  createdBy && (obj.createdBy = own)
  owner && (obj.owner = own)

  return obj
}
