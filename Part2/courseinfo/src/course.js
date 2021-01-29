import React from "react";

const Header = (props)=>{
    return (
        <h1>{props.name}</h1>
    );
}

const Part = (props)=>{
    return (
        props.part.map(
        p => 
            <p key={p.id}>{p.name} {p.exercises}</p>
        )
    );
}

const Total = (props)=>{
    const total = props.part.reduce((t1, t2) => t1 + t2.exercises, 0);
    return (
        <h4>Total of {total} exercises</h4>
    );
}

const Course = (props)=>{
    const courses = props.courses;
    return(
          courses.map(
            course=>
            <div key={course.id}>
              <Header name={course.name} />
              <Part part={course.parts} />
              <Total part={course.parts} />
            </div>
  
          )
    );
  }
export default Course;