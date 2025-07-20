import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value, extra}) => {
  return (
    <tr>
      <td>{text}</td> <td>{value}</td> {extra}
    </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive + "%"}/>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)


  const handleGoodClicks = () => {
      let newGood = good + 1
      let newAll = newGood + bad + neutral
      let newAverage = newAll / 3
      let newPositive = (newGood / newAll) * 100

      setGood(newGood)
      setAll(newAll)
      setAverage(newAverage)
      setPositive(newPositive)
  }

  const handleNeutralClicks = () => {
    let newNeutral = neutral + 1
    let newAll = newNeutral + bad + good
    let newAverage = newAll / 3
    let newPositive = (good / newAll) * 100

    setNeutral(newNeutral)
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
  }

  const handleBadClicks = () => {
    let newBad = bad + 1
    let newAll = newBad + good + neutral
    let newAverage = newAll / 3
    let newPositive = (good / newAll) * 100

    setBad(newBad)
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
  }

  if (good == 0 && bad == 0 && neutral == 0) {
    return (
      <>
          <h2>give feedback</h2>
          <Button onClick={handleGoodClicks} text={"good"} />
          <Button onClick={handleNeutralClicks} text={"neutral"} />
          <Button onClick={handleBadClicks} text={"bad"} />

          <h2>statistics</h2>
          <p>No feedback given</p>
      </>
    )
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClicks} text={"good"} />
      <Button onClick={handleNeutralClicks} text={"neutral"} />
      <Button onClick={handleBadClicks} text={"bad"} />

      <Statistics good={good} bad={bad} neutral={neutral} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App