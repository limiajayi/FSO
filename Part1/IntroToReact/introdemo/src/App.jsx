import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Paragraph = ({text, number}) => {
  return (
    <div>
      <p>
        {text} {number}
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClicks = () => {
      let newGood = good + 1
      setGood(newGood)
  }

  const handleNeutralClicks = () => {
    let newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleBadClicks = () => {
    let newBad = bad + 1
    setBad(newBad)
  }



  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClicks} text={"good"} />
      <Button onClick={handleNeutralClicks} text={"neutral"} />
      <Button onClick={handleBadClicks} text={"bad"} />

      <h2>statistics</h2>
      <Paragraph text={"good"} number={good} />
      <Paragraph text={"neutral"} number={neutral} />
      <Paragraph text={"bad"} number={bad} />
    </div>
  )
}

export default App