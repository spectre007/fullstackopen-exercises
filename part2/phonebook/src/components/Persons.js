import React from "react"


const Person = ({ name, number, onDelete }) => {
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

const Persons = ({ persons, onDelete }) => {
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

export default Persons
