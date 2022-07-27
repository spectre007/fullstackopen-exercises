import { useState } from 'react'

const Person = ({name, number}) => <div>{name} {number}</div>

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

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((p) => <Person key={p.name} name={p.name} number={p.number} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: "040-1234567" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setPersonFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p.name)
    if (!names.includes(newName)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons([...persons, newPerson])
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
    setNewName("")
    setNewNumber("")
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
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
