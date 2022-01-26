import { fromEsRecord } from './record'

const esRecord = {
  a: '61f169b03f659c000970c38d',
  b: 'Elevit Breastfeeding Multivitamin Capsules 60 Pack (60 Days)',
  d: 'Amazon',
  e: '5',
  f: '29/02/2024',
  i: 's',
  k: 'Perth',
}

test.only('fromEsRecord', () => {
  expect(fromEsRecord(esRecord)).toEqual({})
})
