import React from 'react'

const Person = ({searchTerm, persons, removePerson}) => {
  return (
    <div>
    <ul>
        {(searchTerm === '' 
        ? 
          persons.map(x =>           
          <li key={x.name}>{x.name} {x.number} <button onClick={() =>removePerson(x.id)}>X</button></li>)
        : 
          persons.filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase())).map(person => 
          <li key={person.name}>{person.name} {person.number} <button onClick={() =>removePerson(person.id)}>x</button></li>))
        }
    </ul>

    </div>
  )
}

export default Person