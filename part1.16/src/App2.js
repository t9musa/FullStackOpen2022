import { useState } from 'react'


const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const voting = (points, selected) => {
  const copy = [...points]
  // kasvatetaan taulukon paikan 2 arvoa yhdellä
  copy[selected] += 1 
  return copy
}

const compare = (points) => {
const value = Math.max(...points)
return points.indexOf(value)
}

const App2 = () => {

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
  const [points, setPoints] = useState([1, 4, 6, 3, 7, 11, 2 ,19])

  console.log(points)
  return (
    <div>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]}
      <br></br>
      <button onClick={() => setPoints(voting(points, selected))} >Vote</button>
      <button onClick={() => setSelected(getRandomInt(0, anecdotes.length))}>next anecdote</button>
      <br></br>
      <h1>Anecdote with most votes</h1>
      <br></br>
        <div>{anecdotes[compare(points)]}</div>
    </div>
  )
}

export default App2