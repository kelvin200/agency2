import trim from 'lodash/trim'
import zipObject from 'lodash/zipObject'

export const csvToObjectArray = <T = unknown>(csvString: string): T[] => {
  const csvRowArray = csvString.split(/\n/)
  const headerCellArray = trimQuotes(csvRowArray.shift().split(','))
  const emptyCell = []

  for (let i = 0; i < headerCellArray.length; ++i) {
    if (!headerCellArray[i]) {
      emptyCell.push(i)
    }
  }
  for (let i = emptyCell.length - 1; i >= 0; --i) {
    headerCellArray.splice(emptyCell[i], 1)
  }

  const objectArray = []

  while (csvRowArray.length) {
    const c = csvRowArray.shift()
    if (!trim(c)) {
      continue
    }
    const rowCellArray = trimQuotes(c.split(','))
    for (let i = emptyCell.length - 1; i >= 0; --i) {
      rowCellArray.splice(emptyCell[i], 1)
    }

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
