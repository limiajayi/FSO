import { useState, useEffect } from "react"
import axios from "axios"
import Note from "./components/Note"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  //use useEffect to load the notes from localhost utilising axios

  const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

  useEffect(hook, [])
  console.log('render', notes.length, 'notes')


  //to save changes in input to state
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  //add a new html form
  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
        <h1>Notes</h1>
        <div>
          <button onClick={() => setShowAll(!showAll)}>
            show {showAll ? 'important' : 'all'}
          </button>
        </div>

        <ul>
          {notesToShow.map((note) => {
            return (
              <Note key={note.id} note={note} />
            )
          })}
        </ul>

        <form onSubmit={addNote}>

          <input 
          type="text" 
          value={newNote} 
          onChange={handleNoteChange}/>

          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default App
