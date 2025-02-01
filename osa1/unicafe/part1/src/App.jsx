import { useState } from 'react'

const Statistics = (props) => {

  if (props.total === 0) {
    return (
      <tr>
        <td> No feedback given </td>
      </tr>
    )
  }

  return (
    <>
    <tr>
      <StatisticLine text="good"/>
      <td>{props.good}</td>
    </tr>
    <tr>
      <StatisticLine text="neutral"/>
      <td>{props.neutral}</td>
    </tr>
    <tr>
      <StatisticLine text="bad"/>
      <td>{props.bad}</td>
    </tr>
    <tr>
      <StatisticLine text="total"/>
      <td>{props.total}</td>
    </tr>
    <tr>
      <StatisticLine text="average"/>
      <td>{(props.good*1 + props.bad*(-1)) / props.total} </td>
    </tr>
    <tr>
      <StatisticLine text="positive"/>
      <td>{(props.good*1/props.total)*100 + "%"}</td>
    </tr>
    </>
  )
}

const StatisticLine = (props) => (
  <td>{props.text} </td>
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
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}></Statistics>
        </tbody>
      </table>
    </div>
  )
}

export default App