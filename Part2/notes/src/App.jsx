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

  //axios get method to retrieve the notes from json-server
  axios.get('http://localhost:3001/notes')
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
    }

    //axios post method to add a new noteobject to json.server
    axios.post('http://localhost:3001/notes', noteObject)    
          .then(response => {
            setNotes(notes.concat(response.data))
            setNewNote('')
          })
  }

  const toggleImportanceOf = id => {
    //url of the individual note we're changing
    const url = `http://localhost:3001/notes/${id}`

    //finding the note object we're changing using it's id, in the notes state object above
    const note = notes.find(n => n.id === id)

    //using spread syntax to copy the previous values, then change the importance of the note above
    const changedNote = {...note, important: !note.important}

    //using a HTTP PUT request to put a different object at the note-id url
    //then replacing the note of with the parameter id above with a new note within the notes state object
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(note => note.id === id ? response.data : note))
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
          onChange={handleNoteChange}/>

          <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default App
