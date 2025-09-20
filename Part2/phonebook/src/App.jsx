import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const hook = () => {
    axios.get('http://localhost:3001/persons')
          .then(response => {
            console.log('promise fulfilled')
            setPersons(response.data)
          })
  }

  useEffect(hook, [])


  const addPerson = (event) => {
    event.preventDefault()
    let same = false

    //if there are repeat names
    for (let object in persons) {
        if (persons[object].name === newName) same = true
    }
    if (same === true) {
      alert(`${newName} is already added in phonebook`)
      return
    }

    //if there are no repeat names
    const newNameObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newNameObject))
  }

  //case insensitive search
  const personsToShow = searchValue ? persons.filter(person => {return person.name.toLowerCase().includes(searchValue) || person.name.includes(searchValue)}) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      {/* searching refractored into a filter component */}
      <Filter searchValue={searchValue} setSearchValue={setSearchValue} />


      {/* form refractored into a personform component */}
      <PersonForm 
        addPerson={addPerson} 
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />

    </div>
  )
  
}

export default App