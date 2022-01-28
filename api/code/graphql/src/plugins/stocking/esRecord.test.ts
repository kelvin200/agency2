import { fromEsRecord } from './esRecord'

const esRecord = {
  b: '61f169b03f659c000970c38d',
  c: 'Elevit Breastfeeding Multivitamin Capsules 60 Pack (60 Days)',
  e: 'Amazon',
  f: 5,
  g: '29/02/2024',
  a: 's',
  k: 'Perth',
}

test('fromEsRecord', () => {
  expect(fromEsRecord(esRecord)).toEqual({
    esIndex: 's',
    expiryDate: '29/02/2024',
    id: '61f169b03f659c000970c38d',
    pName: 'Elevit Breastfeeding Multivitamin Capsules 60 Pack (60 Days)',
    quantity: 5,
    toLocation: 'Perth',
    vendor: 'Amazon',
  })
})
