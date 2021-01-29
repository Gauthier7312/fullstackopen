import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
   name: "Half Stack application development"
  ,
   parts: [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    {
      name: "State of a component",
      exercises: 14
    }
  ]
  }
 

  const Header = (props)=> {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props)=> {
    return(
      <p>{props.part} {props.exercises}</p>
    )
  }

  const Content = (props)=>{
    return(
      <div>
        {
          props.parts.map(part=> (<Part part={part.name} exercises={part.exercises} />))
        } 
      </div>
    )
  }

  const Total = (props)=> {
    let count = 0;
    props.parts.map(part => count+= part.exercises)
    return (
      <div>
        <p>Number of exercises {count} </p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
