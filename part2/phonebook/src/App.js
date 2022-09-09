import personService from "./services/persons"
import { useEffect, useState } from 'react'
import "./index.css"

const Person = ({name, number, onDelete}) => {
  const confirmedDelete = () => {
    if(window.confirm(`Delete ${name} ?`)) {
      onDelete()
    }
  }

  return (
    <div>
      {name} {number}
      <button onClick={confirmedDelete}>
        delete
      </button>
    </div>
  )
}

const Filter = ({value, onChange}) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.name} onChange={props.onChangeName} />
      </div>
      <div>
        number: <input value={props.number} onChange={props.onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, onDelete}) => {
  return (
    <div>
      {persons.map((p) => <Person 
          key={p.name}
          name={p.name}
          number={p.number}
          onDelete={onDelete(p.id)}
        />)
      }
    </div>
  )
}

const Notification = ({ payload }) => {
  if (Object.keys(payload).length === 0) { return null}

  return (
    <div className={payload.type}>
      {payload.message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')
  const [statusMessage, setStatusMessage] = useState({})

  const hook = () => {
    personService
    .getAll()
    .then(initialList => {
      setPersons(initialList)
    })
  }
  useEffect(hook, [])

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
          setStatusMessage({message: `Added ${newName}`, type: "status"})
          setTimeout(() => setStatusMessage({}), 4500)
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
            setStatusMessage({message: `Changed number of ${newName}`, type: "status"})
            setTimeout(() => setStatusMessage({}), 4500)
          })
          .catch(error => {
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
        .catch(error => {
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
    : persons;
  

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
