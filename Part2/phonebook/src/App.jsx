import { useState } from 'react'
import Number from './components/Number'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')


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

  //case insensitive search
  const personsToShow = searchValue ? persons.filter(person => {return person.name.toLowerCase().includes(searchValue) || person.name.includes(searchValue)}) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <p>
        filter shown with 
        <input type='text' value={searchValue} onChange={({ target }) => {setSearchValue(target.value)}} />
      </p>

      <form onSubmit={addPerson}>

        <div>
          name: 
          <input 
          type='text'
          value={newName} 
          onChange={({ target }) => {setNewName(target.value)}} />
        </div>

        <div>
          number: 
          <input
          type='text'
          value={newNumber}
          onChange={({ target }) => {setNewNumber(target.value)}} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>

      <div>
        {personsToShow.map((person) => {
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