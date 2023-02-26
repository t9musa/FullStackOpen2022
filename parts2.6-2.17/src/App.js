import { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import personService from './services/persons.js'
import Notification from './components/Notification.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, changeSearchTerm] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {    
    console.log('effect')    
  personService.getAll()      
  .then(response => {        
    console.log('promise fulfilled')        
    setPersons(response.data)      
    })  
  }, [])  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {    
    event.preventDefault()
    const personObject = {name: newName,number: newNumber}    

    if(!persons.find(x => x.name === personObject.name)) {
      personService.create(personObject)
      .then(response => { setPersons(persons.concat(response.data))})
      .catch(error => {
        // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
        console.log(error.response.data)
        setStatusMessage(error.response.data.error)
      })  
      .then(setStatusMessage(`${personObject.name} added!`))
        setTimeout(() => {          
          setStatusMessage(null)        
        }, 5000)
    } else {
        if(window.confirm(`${personObject.name} was already found in the list. Do you want to update the number?`)){
          //get the id value of the person object
          const personFound = persons.find(x => x.name === personObject.name)
          //remove the existing object from the array
          const filteredList = persons.filter(x => x.id !== personFound.id);
          //add the modified object back to its place
          filteredList.splice((personFound.id-1), 0, personObject)
          //now we have a list with the new value modified
          personService.update(personFound.id, personObject)
          .then(
            setPersons(filteredList)
            )
          .then(setStatusMessage(`${personObject.name}'s number updated!`))
          setTimeout(() => {          
            setStatusMessage(null)        
          }, 5000)
          }
        }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => { 
    if(persons.find(x => x.id === id)) {
      const person = persons.find(x => x.id ===id)
      if (window.confirm(`Do you really want to delete person ${person.name}?`)) {
        personService.remove(id)
        .then(setPersons(persons.filter(n => n.id !== id)))
       
        .catch(error => {      
          setStatusMessage(        
            `the person: '${person.name}' was already deleted from the server`      
            )      
            //setPersons(persons.filter(n => n.id !== id))    
          })
          setTimeout(() => {          
            setStatusMessage(null)        
          }, 5000)

      } 
      //window.open(`Person ${person.name} was deleted successfully!`)   
      setStatusMessage(`${person.name} deleted!`)  
      setTimeout(() => {          
        setStatusMessage(null)        
      }, 5000)
    }
  }

  //handlers
  const handlePersonChange = (event) => {setNewName(event.target.value)}         
  const handlePersonNumberChange = (event) => {setNewNumber(event.target.value)}      
  const handleSearchTerm = (event) => {changeSearchTerm(event.target.value)}  

  return (
    <div>
      <h1>Phonebook</h1>
      <b>{statusMessage ? 
      <Notification message={statusMessage}/>
      :
       ''
       }</b>
      
      <Filter searchTerm={searchTerm} handleSearchTerm={handleSearchTerm}/>
      <h2>Add a new number</h2>
      <PersonForm addPerson={addPerson} newNumber={newNumber} newName={newName} handlePersonChange={handlePersonChange} handlePersonNumberChange={handlePersonNumberChange}/>
      <h2>Numbers</h2>
      <Persons searchTerm={searchTerm} persons={persons} removePerson={removePerson}/>
    </div>
  )

}

export default App