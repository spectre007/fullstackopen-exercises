import personService from "./services/persons"
import { useEffect, useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

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
          .catch(error => alert(error))
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
          alert(`Person with id=${id} already removed.`)
          console.log(error.message)
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
