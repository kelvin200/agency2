import get from 'lodash/get'
import set from 'lodash/set'
import { getJsonSize } from './getJsonSize'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789+-*/?!@#$%^&*()[]{}|:;<>,'

export type MapObjFunc = (obj: Record<string, any>) => Record<string, any>

export const record = ({
  fields,
  recordMaxSize,
  mapBefore,
  mapAfter,
}: {
  fields: string[]
  recordMaxSize: number
  mapBefore?: MapObjFunc
  mapAfter?: MapObjFunc
}) => {
  const fieldMapping: Record<string, string> = {}
  const fieldMappingReversed: Record<string, string> = {}

  for (let i = 0; i < fields.length; ++i) {
    fieldMapping[fields[i]] = ALPHABET[i]
    fieldMappingReversed[ALPHABET[i]] = fields[i]
  }

  const toRecord = (obj: Record<string, any>, mapObjAfter?: MapObjFunc) => {
    mapBefore && (obj = mapBefore(obj))
    let result: Record<string, any> = {}
    for (let i = 0; i < fields.length; ++i) {
      result[ALPHABET[i]] = get(obj, fields[i])
    }
    mapObjAfter && (result = mapObjAfter(result))
    mapAfter && (result = mapAfter(result))
    const size = getJsonSize(result)
    if (size > recordMaxSize) {
      throw new Error(`RECORD is bigger than ${recordMaxSize}KB`)
    }
    return result
  }

  const toRecordWithoutMapping = (obj: Record<string, any>) => {
    let result: Record<string, any> = {}
    for (let i = 0; i < fields.length; ++i) {
      result[ALPHABET[i]] = get(obj, fields[i])
    }
    result = result
    const size = getJsonSize(result)
    if (size > recordMaxSize) {
      throw new Error(`RECORD is bigger than ${recordMaxSize}KB`)
    }
    return result
  }

  const fromRecord = (obj: Record<string, any>) => {
    const result: any = {}
    for (let i = 0; i < fields.length; ++i) {
      if (typeof obj[ALPHABET[i]] !== 'undefined') {
        set(result, fields[i], obj[ALPHABET[i]])
      }
    }
    return result
  }

  return {
    toRecord,
    fromRecord,
    toRecordWithoutMapping,
    fieldMapping,
    fieldMappingReversed,
  }
}
