import { csvToObjectArray } from './csv'

const csv = `,a,b,purchaseDate,pName,vendor,toLocation,expiryDate,c,quantity,d,audRate,e,f,costAud,costVnd
,1,U000001,21/11/2021,Blackmores Conceive Well Gold 28 Tablets + 28 Capsules,Coles,Melbourne,01/01/2023,$19.50,1,,"16,800 ₫",0.14,$2.16,$21.66,"363,888 ₫"
,10,U000010,21/11/2021,Bio Oil 125mL,Chemmist,Melbourne,01/10/2025,$16.99,10,,"16,800 ₫",0.14,$21.60,$191.50,"3,217,200 ₫"
,5,U000011,21/11/2021,Thompson's One-A-Day Ginkgo 6000mg 60 Capsules,Chemmist,Melbourne,01/01/2023,$16.99,5,,"16,800 ₫",0.36,$27.00,$111.95,"1,880,760 ₫"
,5,U000002,23/11/2021,Elevit Breastfeeding Multivitamin Capsules 60 Pack (60 Days),Amazon,Perth,29/02/2024,$23.99,5,,"16,800 ₫",0.12,$9.00,$128.95,"2,166,360 ₫"
`

test('CSV', () => {
  expect(csvToObjectArray(csv)).toEqual([
    {
      a: '1',
      audRate: '16',
      b: 'U000001',
      c: '$19.50',
      costAud: '$2.16',
      costVnd: '$21.66',
      d: '',
      e: '800 ₫',
      expiryDate: '01/01/2023',
      f: '0.14',
      pName: 'Blackmores Conceive Well Gold 28 Tablets + 28 Capsules',
      purchaseDate: '21/11/2021',
      quantity: '1',
      toLocation: 'Melbourne',
      vendor: 'Coles',
    },
    {
      a: '10',
      audRate: '16',
      b: 'U000010',
      c: '$16.99',
      costAud: '$21.60',
      costVnd: '$191.50',
      d: '',
      e: '800 ₫',
      expiryDate: '01/10/2025',
      f: '0.14',
      pName: 'Bio Oil 125mL',
      purchaseDate: '21/11/2021',
      quantity: '10',
      toLocation: 'Melbourne',
      vendor: 'Chemmist',
    },
    {
      a: '5',
      audRate: '16',
      b: 'U000011',
      c: '$16.99',
      costAud: '$27.00',
      costVnd: '$111.95',
      d: '',
      e: '800 ₫',
      expiryDate: '01/01/2023',
      f: '0.36',
      pName: "Thompson's One-A-Day Ginkgo 6000mg 60 Capsules",
      purchaseDate: '21/11/2021',
      quantity: '5',
      toLocation: 'Melbourne',
      vendor: 'Chemmist',
    },
    {
      a: '5',
      audRate: '16',
      b: 'U000002',
      c: '$23.99',
      costAud: '$9.00',
      costVnd: '$128.95',
      d: '',
      e: '800 ₫',
      expiryDate: '29/02/2024',
      f: '0.12',
      pName: 'Elevit Breastfeeding Multivitamin Capsules 60 Pack (60 Days)',
      purchaseDate: '23/11/2021',
      quantity: '5',
      toLocation: 'Perth',
      vendor: 'Amazon',
    },
  ])
})
