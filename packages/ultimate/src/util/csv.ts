import trim from 'lodash/trim'
import zipObject from 'lodash/zipObject'

export const csvToObjectArray = <T = unknown>(csvString: string): T[] => {
  const csvRowArray = csvString.split(/\n/)
  const headerCellArray = trimQuotes(csvRowArray.shift().split(','))
  const objectArray = []

  while (csvRowArray.length) {
    const rowCellArray = trimQuotes(csvRowArray.shift().split(','))
    const rowObject = zipObject(headerCellArray, rowCellArray)
    objectArray.push(rowObject)
  }
  return objectArray
}

export const trimQuotes = (stringArray: string[]) => {
  for (let i = 0; i < stringArray.length; i++) {
    stringArray[i] = trim(stringArray[i], '"')
  }
  return stringArray
}
