import { useState } from 'react'

const Shuffle = (x) => {
  const i = Math.floor(Math.random()*x)
  console.log('random number', i)
  return i
}

const Vote = (selected, votes) => {
  const array_copy = [...votes]
  console.log('voting result before', array_copy)
  array_copy[selected] += 1
  console.log('voting result after', array_copy)
  return array_copy
}

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]  
    
  const [selected, setSelected] = useState(0)
  const x = anecdotes.length
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])
  const maxvotes = Math.max(...votes) 
  const winneranecdote = votes.indexOf(maxvotes)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br>
      </br>
      <button onClick={() => setVotes(Vote(selected,votes))}>vote</button>
      <button onClick={() => setSelected(Shuffle(x))}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {maxvotes === 0 ? (
        <p>No votes given</p>
      ) : (
      <>
        <p>{anecdotes[winneranecdote]}</p>
        <p>has {votes[winneranecdote]} votes</p>
      </>
      )}
    </div>
  )
}

export default App