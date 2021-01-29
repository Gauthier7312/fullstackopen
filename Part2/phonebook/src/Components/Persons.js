import React from "react";
import Person from "./Person";
const Persons = (props) => {
    return (
      props.persons.filter(person =>
        person.name.includes(props.filter)).map(person =>
          <span key={person.id}>
            <Person 
              name={person.name} 
              number={person.number} 
            />
            {' '}
            <button 
              type="button" 
              value={person.id}
              onClick={props.deleteName}>
              delete
            </button>
            <br />
          </span>
        )
    )
  }

  export default Persons;