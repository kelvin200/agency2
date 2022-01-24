import get from 'lodash/get'
import set from 'lodash/set'
import { getJsonSize } from './getJsonSize'

export const record = ({
  fieldMapping,
  recordMaxSize,
}: {
  fieldMapping: Record<string, string>
  recordMaxSize: number
}) => {
  const FIELDS = Object.entries(fieldMapping)

  const toRecord = (obj: Record<string, any>) => {
    const result: any = {}
    for (const f of FIELDS) {
      result[f[1]] = get(obj, f[0])
    }
    const size = getJsonSize(result)
    if (size > recordMaxSize) {
      throw new Error(`RECORD is bigger than ${recordMaxSize}KB`)
    }
    return result
  }

  const fromRecord = (obj: Record<string, any>) => {
    const result: any = {}
    for (const f of FIELDS) {
      set(obj, f[0], obj[f[1]])
    }
    return result
  }

  return { toRecord, fromRecord }
}
