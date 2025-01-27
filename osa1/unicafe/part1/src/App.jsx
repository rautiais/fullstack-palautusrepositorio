import { useState } from 'react'

const Statistics = (props) => {

  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value = {props.good} />
      <StatisticLine text="neutral" value = {props.neutral} />
      <StatisticLine text="bad" value = {props.bad} />
      <StatisticLine text="total" value = {props.total} />
      <StatisticLine text="average" value = {(props.good*1 + props.bad*(-1)) / props.total} />
      <StatisticLine text="positive" value = {(props.good*1/props.total)*100 + "%"} />
    </div>
  )
}

const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text} </td>
        <td>{props.value} </td>
      </tr>
    </tbody>
  </table>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
    setTotal(total+1)
    setGood(good + 1)
    setAverage(average + 1)
    setPositive(positive + 1)
    console.log('good after', good)
  }

  const handleNeutralClick = () => {
    console.log('neutral before', neutral)
    setTotal(total+1)
    setNeutral(neutral + 1)
    console.log('neutral after', neutral)
  }

  const handleBadClick = () => {
    console.log('bad before', bad)
    setTotal(total+1)
    setBad(bad + 1)
    setAverage(average - 1)
    console.log('bad after', bad)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => handleGoodClick(good + 1)} text = "good"/>
        <Button handleClick={() => handleNeutralClick(neutral + 1)} text = "neutral"/>
        <Button handleClick={() => handleBadClick(bad + 1)} text = "bad"/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}></Statistics>
    </div>
  )
}

export default App