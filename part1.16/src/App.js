import { useState } from 'react'


const average = (a,b,c) => {
  return (a-b)/(a+b+c);
}

const overaAllPositivity = (good, bad, neutral) => {
  let returnable = (good/(good+bad+neutral))*100
  return returnable.toString().concat("%")
}

const Statistics = (props) => {
  if(props.good+props.bad+props.neutral < 1) {
    return (
      <div>
      <p>No feedback given</p>
      <br/>
      </div>
    )
  }
return (
      <div>
        <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="total" value={props.good+props.bad+props.neutral}/>
          <StatisticLine text="average" value={average(props.good, props.bad, props.neutral)}/>
          <StatisticLine text="positive" value={overaAllPositivity(props.good, props.bad, props.neutral)}/>
        </tbody>
      </table>
      </div>
      )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      {props.text} = {props.value}
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <br/>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App