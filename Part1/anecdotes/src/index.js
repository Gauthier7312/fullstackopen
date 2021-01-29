import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [tableau, setTableau] = useState(new Array(anecdotes.length).fill(0));
  const handleClick = () => {
    setSelected(selected + 1)
  }
  const handleChange = (selected) => {
    const copy = [...tableau]
    copy[selected] +=1;
    setTableau(copy)
  }
  const hoverVote = (tableau.indexOf(Math.max(...tableau)));
  return (
    <div>
      <h1>Anecdote of the day</h1>
    
      <h3>{props.anecdotes[selected]}</h3>
      <h4>has {tableau[selected]} votes </h4>
      
      <button onClick={()=>handleChange(selected)}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      
      <h1>Anecdote with hoverVote votes</h1>
    
      <h3>{props.anecdotes[hoverVote]}</h3>
      <h4>has {tableau[hoverVote]} votes </h4>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
