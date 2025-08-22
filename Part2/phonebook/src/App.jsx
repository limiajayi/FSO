import { useState } from 'react'
import Number from './components/Number'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    let same = false
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          type='text'
          value={newName} 
          onChange={handleNameChange} />
        </div>

        <div>
          number: 
          <input
          type='text'
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      <div>
        {persons.map((person) => {
          return (
            <Number 
            key={person.name} 
            person={person} />
          )
        })}
      </div>

    </div>
  )
}

export default App