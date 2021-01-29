import ReactDOM from 'react-dom'
import React, {useState} from 'react'

const Button = (props)=>{
  return (
    <button onClick={props.handOnclick}>{props.name}</button>
  );
}

const Statistique = (props)=>{
  return (
    props.value !==0 && (
      <p>{props.text} {props.value} {props.percentage}</p>
    )
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const Showfeed = (good!== 0 || neutral!==0 || bad!==0)?
  (
    <div>
      <Statistique text="average" value={(good - bad)/(good+neutral+bad)} />
      <Statistique text="positive" value={(good * bad)/(good+neutral+bad)} percentage="%" />
    </div>
  )
  :(<h2>No feedback</h2>)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handOnclick={()=> setGood(good + 1)} name="good" />
      <Button handOnclick={()=> setNeutral(neutral+1)} name="neutral" />
      <Button handOnclick={()=> setBad(bad+1)} name="bad" />

      <h3>statistics</h3>
      <Statistique text="good" value={good} />
      <Statistique text="neutral" value={neutral} />
      <Statistique text="bad" value={bad} />
      {Showfeed}
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
