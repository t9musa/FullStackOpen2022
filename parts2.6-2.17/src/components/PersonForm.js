import React from 'react'

const PersonForm = ({addPerson, newName, handlePersonChange, newNumber, handlePersonNumberChange}) => {
  return (
    <div>
        <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handlePersonChange}/></div>
            <div>number: <input value={newNumber} onChange={handlePersonNumberChange}/></div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </div>
  )
}

export default PersonForm