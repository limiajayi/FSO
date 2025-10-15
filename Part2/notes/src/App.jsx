import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from "./services/notes"


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => setNotes(initialNotes))
  }, [])

  //to change the importance of a note
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(error => {
      alert(`The note '${note.content}' was already deleted from the server.`)
      setNotes(notes.filter(n => n.id !== id))
    })

  }

  //when submitting the form
  const addNote = (event) => {
      event.preventDefault()
      
      const noteObject = {
        content: newNote,
        important: Math.random() < 0.5,
      }

      //add a new noteobject to json.server
      noteService
      .create(noteObject)
      .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
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
                  <Note 
                    key={note.id} 
                    note={note} 
                    toggleImportance={() => toggleImportanceOf(note.id)}
                  />
                )
              })}
            </ul>

            <form onSubmit={addNote}>

              <input 
              type="text" 
              value={newNote} 
              onChange={({ target }) => setNewNote(target.value)}/>

              <button type="submit">Submit</button>
            </form>
        </div>
  )
}

export default App
