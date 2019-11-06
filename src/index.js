import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import BarChart from './Chart/BarChart'
import { barSeries, barSeriesBetweenMonths } from './data'

import './styles.css'

function App() {
  const [displayBy, setDisplayBy] = useState('day')
  return (
    <div className="App">
      <h2>Select chart range</h2>
      <button onClick={() => setDisplayBy('day')}>Day</button>
      <button onClick={() => setDisplayBy('week')}>Week</button>
      <button onClick={() => setDisplayBy('month')}>Month</button>
      <h2>Sentiment by {displayBy}</h2>
      <BarChart data={barSeriesBetweenMonths} stacked displayBy={displayBy} />
      {/* <BarChart data={barSeries} stacked displayBy={displayBy} /> */}
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
