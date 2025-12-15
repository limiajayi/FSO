import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personsService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personsService
    .getAll()
    .then(initialPeople => setPersons(initialPeople))
  }, [])


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
      number: newNumber,
    }

    //persons service object from services
    //returns response.data, the new object
    //which can concatenated to the previous persons state object
    personsService
    .create(newNameObject)
    .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setMessage(`Added ${newNameObject.name}!`)

        console.log(message)
      
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        }
    )
  }

  const deletePerson = (id, name) => {
    //use windows.confirm like alert to make sure the user wants to delete the number
    //if yes, personService.deletePerson( ) is executed. it returns nothing (just the request)

    if (confirm(`Are you sure you want to delete ${name}'s number?`)) {
        personsService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
          })
    }
  }

  //case insensitive search
  const personsToShow = searchValue ? persons.filter(person => {return person.name.toLowerCase().includes(searchValue) || person.name.includes(searchValue)}) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

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

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

    </div>
  )
  
}

export default App