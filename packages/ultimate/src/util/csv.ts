import zipObject from 'lodash/zipObject'

export const csvToObjectArray = <T = unknown>(text: string): T[] => {
  let p = '',
    row = [''],
    i = 0,
    r = 0,
    s = !0,
    l
  const ret = [row]

  for (l of text) {
    if ('"' === l) {
      if (s && l === p) {
        row[i] += l
      }
      s = !s
    } else if (',' === l && s) {
      l = row[++i] = ''
    } else if ('\n' === l && s) {
      if ('\r' === p) {
        row[i] = row[i].slice(0, -1)
      }
      row = ret[++r] = [(l = '')]
      i = 0
    } else {
      row[i] += l
    }
    p = l
  }

  const headerCellArray = ret.shift()
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

  while (ret.length) {
    const c = ret.shift()
    if (c.length < 2) {
      continue
    }
    const rowCellArray = c
    for (let i = emptyCell.length - 1; i >= 0; --i) {
      rowCellArray.splice(emptyCell[i], 1)
    }

    const rowObject = zipObject(headerCellArray, rowCellArray)
    objectArray.push(rowObject)
  }
  return objectArray
}
