import React, { useState, useEffect } from 'react';
import Services from "./services/person";
import './index.css';
import Filtre from "./Components/Filtre";
import PersonForm from "./Components/PersonForm";
import  Persons from "./Components/Persons";
import Notification from "./Components/Notification";

const App = () => {

  useEffect(() => {
    Services
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        })
  }, [])

  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setmessage] = useState(null)
  const [messageType, setMessageType] = useState(null) 

  const handlFilterChange = (e) => setFilter(e.target.value);
  const handleNameChange = (e) => setName(e.target.value)
  const handleNumberChange = (e) => setNumber(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    const duplicate = persons.find(person => person.name === name)
    if (typeof duplicate !== 'undefined' && duplicate.number !== number) {
      Services
        .update(duplicate.id, { name: duplicate.name, number: number})
        .then(returnedPerson => {
          if (window.confirm(`${returnedPerson.name} is already added to phonebook, 
            replace the old number with a new one?`)) {
            setPersons(persons.map(person => 
                      person.id !== duplicate.id ? person : returnedPerson))
          }
          setName('')
          setNumber('')
        })
        return
    } else if (typeof duplicate !== 'undefined') {
        alert(`${name} is already added to phonebook`)
        setName('')
        setNumber('')
        return
    }

    Services
      .create({ name: name, number: number })
      .then(response => {
        setPersons(persons.concat(response))
        setName('')
        setNumber('')
        setMessageType('confirmation')
        setmessage(`Added ${response.name}`)
        setTimeout(() => {
          setmessage(null)
          setMessageType(null)
        }, 3000)
      })

  }
  
  const handleDelete = (e)=>{
    e.preventDefault();
    const id = parseInt(e.target.value)
    const name = persons[id -1].name
    Services.remove(persons[id -1])
    .then((res)=> 
      {
        setMessageType('error')
        setmessage(`Delete`)
        setTimeout(() => {
          setmessage(null)
          setMessageType(null)
        }, 3000)
      }
    )
    .catch(error => {
      setMessageType('error')
      setmessage(`Information of ${name} has already been removed from server`)
      setTimeout(() => {
        setmessage(null)
        setMessageType('error')
      }, 3000)
      setPersons(persons.filter(n => n.id !== id))
    })
    setPersons(persons.filter(n => n.id !== id))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType} />
      <Filtre Value={filter} Change={handlFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        valueName={name}
        NameChange={handleNameChange}
        valueNumber={number}
        NumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
      filter={filter}
      persons={persons}
      deleteName={handleDelete} />
    </div>
  )
}

export default App
