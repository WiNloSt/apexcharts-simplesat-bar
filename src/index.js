import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

import BarChart from './Chart/BarChart'
import { barSeriesBetweenMonths } from './data'

import './styles.css'

function App() {
  const [displayBy, setDisplayBy] = useState('day')
  const ref = useRef(null)
  return (
    <div className="App">
      <h2>Select chart range</h2>
      <div>
        <button onClick={() => setDisplayBy('day')}>Day</button>
        <button onClick={() => setDisplayBy('week')}>Week</button>
        <button onClick={() => setDisplayBy('month')}>Month</button>
      </div>
      <div>
        <button onClick={() => ref.current.chart.toolbar.downloadPNG()}>
          Download PNG
        </button>
        <button onClick={() => ref.current.chart.toolbar.downloadSVG()}>
          Download SVG
        </button>
      </div>
      <h2>Sentiment by {displayBy}</h2>
      <BarChart
        ref={ref}
        data={barSeriesBetweenMonths}
        stacked
        displayBy={displayBy}
      />
      {/* <BarChart data={barSeries} stacked displayBy={displayBy} /> */}
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
