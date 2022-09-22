import React, { useEffect, useState } from "react"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import "./index.css"
import personService from "./services/persons"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [personFilter, setPersonFilter] = useState("")
  const [statusMessage, setStatusMessage] = useState({})

  useEffect( () => {
    personService
      .getAll()
      .then(initialList => {
        setPersons(initialList)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(p => p.name)
    if (!names.includes(newName)) {
      personService
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)))
        .then(() => {
          setStatusMessage({ message: `Added ${newName}`, type: "status" })
          setTimeout(() => setStatusMessage({}), 4500)
        })
        .catch(error => {
          setStatusMessage({ message: error.response.data.error, type: "error" })
          setTimeout(() => setStatusMessage({}), 4500)
          console.log(error.response.data.error)
        })
    } else {
      const confirmed = window.confirm(`${newName} is already added to phonebook, `
          + "replace the old number with a new one?")
      const existingPerson = persons.find(p => p.name === newName)
      if (existingPerson && confirmed) {
        personService
          .update(existingPerson.id, newPerson)
          .then((returnedPerson) => setPersons(
            persons.map(p => p.id !== existingPerson.id ? p : returnedPerson)
          ))
          .then(() => {
            setStatusMessage({ message: `Changed number of ${newName}`, type: "status" })
            setTimeout(() => setStatusMessage({}), 4500)
          })
          .catch(() => {
            setStatusMessage({
              message: `Information on ${newName} has already been removed from the server!`,
              type: "error"
            })
            setTimeout(() => setStatusMessage({}), 4500)
          })
      }
    }
    setNewName("")
    setNewNumber("")
  }

  const removePerson = (id) => {
    return () => {
      personService
        .remove(id)
        .then(() => setPersons(
          persons.filter(p => p.id !== id)
        ))
        .catch(() => {
          setStatusMessage({
            message: `Information on ${newName} has already been removed from the server!`,
            type: "error"
          })
          setTimeout(() => setStatusMessage({}), 4500)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setPersonFilter(event.target.value)
  }

  const personsToShow = personFilter
    ? persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
    : persons


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification payload={statusMessage} />
      <Filter value={personFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        onDelete={removePerson}
      />
    </div>
  )
}

export default App
