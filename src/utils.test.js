import * as utils from './utils'

describe('getBarChartData', () => {
  describe('display by week', () => {
    describe('Same week data', () => {
      test('one day', () => {
        const series = [
          {
            label: '2019-11-04T00:00:00.000Z',
            value: [1, 2, 3]
          }
        ]
        const data = createMockData(series)

        const barChartData = utils.getBarChartData('week', data)

        const expectedBarChartData = [
          {
            name: 'Positive',
            data: [
              {
                x: '4/11 - 10/11',
                y: 1
              }
            ]
          },
          {
            name: 'Neutral',
            data: [
              {
                x: '4/11 - 10/11',
                y: 2
              }
            ]
          },
          {
            name: 'Negative',
            data: [
              {
                x: '4/11 - 10/11',
                y: 3
              }
            ]
          }
        ]

        expect(barChartData).toEqual(expectedBarChartData)
      })

      test('one day with no data', () => {
        const series = [
          {
            label: '2019-11-04T00:00:00.000Z',
            value: [0, 0, 0]
          }
        ]
        const data = createMockData(series)

        const barChartData = utils.getBarChartData('week', data)

        const expectedBarChartData = [
          {
            name: 'Positive',
            data: [
              {
                x: '4/11 - 10/11',
                y: 0
              }
            ]
          },
          {
            name: 'Neutral',
            data: [
              {
                x: '4/11 - 10/11',
                y: 0
              }
            ]
          },
          {
            name: 'Negative',
            data: [
              {
                x: '4/11 - 10/11',
                y: 0
              }
            ]
          }
        ]

        expect(barChartData).toEqual(expectedBarChartData)
      })

      test('two days', () => {
        const series = [
          {
            label: '2019-11-04T00:00:00.000Z',
            value: [1, 2, 3]
          },
          {
            label: '2019-11-05T00:00:00.000Z',
            value: [4, 5, 6]
          }
        ]
        const data = createMockData(series)

        const barChartData = utils.getBarChartData('week', data)

        const expectedBarChartData = [
          {
            name: 'Positive',
            data: [
              {
                x: '4/11 - 10/11',
                y: 5
              }
            ]
          },
          {
            name: 'Neutral',
            data: [
              {
                x: '4/11 - 10/11',
                y: 7
              }
            ]
          },
          {
            name: 'Negative',
            data: [
              {
                x: '4/11 - 10/11',
                y: 9
              }
            ]
          }
        ]

        expect(barChartData).toEqual(expectedBarChartData)
      })
    })

    describe('different week data', () => {
      test('two days', () => {
        const series = [
          {
            label: '2019-11-03T00:00:00.000Z',
            value: [1, 2, 3]
          },
          {
            label: '2019-11-04T00:00:00.000Z',
            value: [4, 5, 6]
          }
        ]
        const data = createMockData(series)

        const barChartData = utils.getBarChartData('week', data)

        const expectedBarChartData = [
          {
            name: 'Positive',
            data: [
              {
                x: '28/10 - 3/11',
                y: 1
              },
              {
                x: '4/11 - 10/11',
                y: 4
              }
            ]
          },
          {
            name: 'Neutral',
            data: [
              {
                x: '28/10 - 3/11',
                y: 2
              },
              {
                x: '4/11 - 10/11',
                y: 5
              }
            ]
          },
          {
            name: 'Negative',
            data: [
              {
                x: '28/10 - 3/11',
                y: 3
              },
              {
                x: '4/11 - 10/11',
                y: 6
              }
            ]
          }
        ]

        expect(barChartData).toEqual(expectedBarChartData)
      })

      test('empty week in between', () => {
        const series = [
          {
            label: '2019-11-03T00:00:00.000Z',
            value: [1, 2, 3]
          },
          {
            label: '2019-11-04T00:00:00.000Z',
            value: [0, 0, 0]
          },
          {
            label: '2019-11-05T00:00:00.000Z',
            value: [0, 0, 0]
          },
          {
            label: '2019-11-06T00:00:00.000Z',
            value: [0, 0, 0]
          },
          {
            label: '2019-11-07T00:00:00.000Z',
            value: [0, 0, 0]
          },
          {
            label: '2019-11-08T00:00:00.000Z',
            value: [0, 0, 0]
          },
          {
            label: '2019-11-09T00:00:00.000Z',
            value: [0, 0, 0]
          },
          {
            label: '2019-11-10T00:00:00.000Z',
            value: [0, 0, 0]
          },
          {
            label: '2019-11-11T00:00:00.000Z',
            value: [1, 2, 3]
          }
        ]
        const data = createMockData(series)

        const barChartData = utils.getBarChartData('week', data)

        const expectedBarChartData = [
          {
            name: 'Positive',
            data: [
              {
                x: '28/10 - 3/11',
                y: 1
              },
              {
                x: '4/11 - 10/11',
                y: 0
              },
              {
                x: '11/11 - 17/11',
                y: 1
              }
            ]
          },
          {
            name: 'Neutral',
            data: [
              {
                x: '28/10 - 3/11',
                y: 2
              },
              {
                x: '4/11 - 10/11',
                y: 0
              },
              {
                x: '11/11 - 17/11',
                y: 2
              }
            ]
          },
          {
            name: 'Negative',
            data: [
              {
                x: '28/10 - 3/11',
                y: 3
              },
              {
                x: '4/11 - 10/11',
                y: 0
              },
              {
                x: '11/11 - 17/11',
                y: 3
              }
            ]
          }
        ]

        expect(barChartData).toEqual(expectedBarChartData)
      })
    })
  })
})

const meta = {
  category: 'date',
  legends: ['Positive', 'Neutral', 'Negative'],
  data_type: 'number_of_response'
}

function createMockData(series) {
  return {
    meta,
    series
  }
}
