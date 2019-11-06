import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'
import sweetAlert from 'sweetalert2'

import { getBarChartData } from '../utils'

class MyApexChart extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    stacked: PropTypes.bool,
    displayBy: PropTypes.oneOf(['day', 'week', 'month']),
  }

  ref = React.createRef(null)

  render() {
    const series = getBarChartData(
      this.props.displayBy,
      this.props.data,
    ).reverse()

    return (
      <div className="bar">
        <Chart
          ref={this.props.forwardedRef}
          options={{
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '75%',
                maxWidth: '50px',
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              show: true,
              width: 7,
              colors: ['transparent'],
            },
            xaxis: {
              // type: 'datetime',
              labels: {
                // rotate: 0,
                style: {
                  fontSize: '14px',
                },
                // hideOverlappingLabels: true, // this only works for datetime
                // showDuplicates: false,
                trim: false,
                formatter: (value, _, index) => {
                  if (series[0].data.length > 20) {
                    if (index % 2 === 1) {
                      return ''
                    }
                  }

                  return value
                },
              },
              // axisTicks: { show: false },
              // axisTicks: {
              //   borderType: 'solid',
              //   color: '#78909C',
              //   height: 6,
              //   offsetX: 0,
              //   offsetY: 0
              // },
              // floating: false,
              max: 20,
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '14px',
                },
              },
            },
            fill: {
              colors: ['#FF7989', '#FFC86D', '#7AD99A'],
              opacity: 1,
            },
            colors: ['#FF7989', '#FFC86D', '#7AD99A'],
            legend: {
              show: true,
              inverseOrder: true,
              fontSize: '14px',
            },
            tooltip: {
              onDatasetHover: {
                highlightDataSeries: true,
              },
              // this replaces all x,y,z options
              // custom() {
              //   return renderToString(
              //     <div>
              //       <h2>test</h2>
              //     </div>
              //   )
              // },
              marker: {
                show: true,
              },
              fixed: {
                enabled: false,
                position: 'topRight',
                offsetX: 0,
                offsetY: 0,
              },
              style: {
                fontSize: '14px',
              },
            },
            chart: {
              zoom: { enabled: false },
              stacked: this.props.stacked,
              fontFamily: 'Lato,Helvetica, Arial, sans-serif',
              foreColor: '#9b9b9b',
              events: {
                dataPointSelection: (event, chartContext, config) => {
                  const selectedSeries = series[config.seriesIndex]
                  sweetAlert.fire(
                    `Click ${selectedSeries.name}: ${
                      selectedSeries.data[config.dataPointIndex].y
                    }`,
                  )
                },
              },
            },
          }}
          series={series}
          type="bar"
          height="400"
          width="100%"
        />
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => {
  return <MyApexChart {...props} forwardedRef={ref} />
})
