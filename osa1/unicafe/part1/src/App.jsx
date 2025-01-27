import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    console.log('good before', good)
    const updatedGood = good + 1
    const updatedNeutral = neutral
    const updatedBad = bad
    console.log('good after', good)
    setGood(updatedGood)
    setTotal(updatedGood + updatedNeutral + updatedBad)
    setAverage(((1)*updatedGood + 0*updatedNeutral + (-1)*updatedBad)/(updatedGood + updatedNeutral + updatedBad))
    setPositive(updatedGood/(updatedGood + updatedNeutral + updatedBad))
  }

  const handleNeutralClick = () => {
    console.log('neutral before', neutral)
    const updatedNeutral = neutral + 1
    const updatedGood = good
    const updatedBad = bad
    console.log('neutral after', neutral)
    setNeutral(updatedNeutral)
    setTotal(updatedGood + updatedNeutral + updatedBad)
    setAverage(((1)*updatedGood + 0*updatedNeutral + (-1)*updatedBad)/(updatedGood + updatedNeutral + updatedBad))
    setPositive(updatedGood/(updatedGood + updatedNeutral + updatedBad))
  }

  const handleBadClick = () => {
    console.log('bad before', bad)
    const updatedBad = bad + 1
    const updatedNeutral = neutral
    const updatedGood = good
    console.log('bad after', bad)
    setBad(updatedBad)
    setTotal(updatedGood + updatedNeutral + updatedBad)
    setAverage(((1)*updatedGood + 0*updatedNeutral + (-1)*updatedBad)/(updatedGood + updatedNeutral + updatedBad))
    setPositive(updatedGood/(updatedGood + updatedNeutral + updatedBad))
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>
      <h2>statistics</h2>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {average}</p>
      <p>Positive {positive} %</p>
    </div>
  )
}

export default App