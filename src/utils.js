import * as R from 'ramda'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import en from 'dayjs/locale/en'
dayjs.locale({
  ...en,
  weekStart: 1,
})
dayjs.extend(utc)

/**
 *
 * @typedef {'day' | 'week' | 'month'} DisplayBy
 */

export function getBarChartData(displayBy, data) {
  const meta = data.meta
  const series = data.series
  const legends = meta.legends
  return legends.map((legend, i) => ({
    name: legend,
    data: groupBy(
      displayBy,
      series.map(data => {
        return {
          x: data.label,
          y: data.value[i],
        }
      }),
    ),
  }))
}

/**
 *
 * @param {DisplayBy} displayBy
 * @param {array} series
 */
function groupBy(displayBy, series) {
  const sumByDisplayBy = series.reduce(sumChart(displayBy), {})

  return Object.keys(sumByDisplayBy).map(key => {
    return { x: key, y: sumByDisplayBy[key] }
  })
}

/**
 *
 * @param {DisplayBy} displayBy
 */
function sumChart(displayBy) {
  return function(acc, data) {
    const group = getGroup(displayBy, data)
    const defaultValue = 0
    const currentValue = acc[group] || defaultValue
    acc[group] = currentValue + data.y
    return acc
  }
}

/**
 *
 * @param {DisplayBy} displayBy
 * @param {{x: string, y: number}} data
 */
function getGroup(displayBy, data) {
  const startDate = startOf(displayBy, data.x)

  if (displayBy === 'day') {
    const format = 'D MMM'
    return startDate.format(format)
  }

  if (displayBy === 'week') {
    const endDate = endOf(displayBy, data.x)
    const format = 'D/M'
    return startDate.format(format) + ' - ' + endDate.format(format)
  }

  if (displayBy === 'month') {
    const format = 'MMM'
    return startDate.format(format)
  }
}

function startOf(displayBy, date) {
  return dayjs.utc(date).startOf(displayBy)
}

function endOf(displayBy, date) {
  return dayjs.utc(date).endOf(displayBy)
}
