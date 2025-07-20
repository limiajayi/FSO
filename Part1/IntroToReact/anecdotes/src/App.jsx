import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //selected randomly changes to the indices of the anecdotes array
  const [selected, setSelected] = useState(0)

  //votes shows how many votes each anecdote has
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  //chooses randomly the next anecdote
  const handleSelectedChange = () => {
    let newSelected = Math.floor(Math.random() * anecdotes.length)
    setSelected(newSelected)
  }

  //handles votes for each anecdote
  const handleVotes = () => {
    //state cannot be updated directly so we create a copy
    const copy = [...votes]

    //update current selected vote
    copy[selected] += 1

    setVotes(copy)
  }

  //finds the index of the max votes
  const findMaxVotes = (arr) => {
    let maxIndex = 0

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[maxIndex]) maxIndex = i
    }

    return maxIndex
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {/* the anecdote itself */}
      <p>{anecdotes[selected]}</p>

      {/* the votes the anecdote has */}
      <p>has {votes[selected]} votes</p>

      <div>
        <Button onClick={handleVotes} text={"vote"} />
        <Button onClick={handleSelectedChange} text={"next anecdote"} />
      </div>

      <div>
        <h2>Anecdote with the most votes</h2>
        {/* shows the anecdote with the maximum amount of votes */}
        <p>
          {anecdotes[findMaxVotes(votes)]}
        </p>
      </div>

    </div>
  )
}

export default App