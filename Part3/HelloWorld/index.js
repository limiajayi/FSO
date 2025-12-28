const express = require('express')
const app = express()

// our "api" as a Java Object, later converted to json, which we will use to learn restful APIs

//This helps us to convert the request body into a JSON format -
app.use(express.json())

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

// get request for the root of the app
app.get('/', (request, response) => {
    response.send('<p>Welcome to the notes root API</p>')
})


// get request for the notes api, using a restful url format
// returns notes in a json format
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(object => Number(object.id))) : 0
    // notes.map(object => Number(object.id)) creates a new list that contains only the id numbers
    // Math.max() returns the maximum number

    //returns the stringified new id
    return String(maxId + 1)
}

//post request to add a new note object to the notes list
app.post('/api/notes', (request, response) => {
    const body = request.body

    // if the body of the request is falsy send a status code 404
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    // the new note object, add this to the notes list
    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    //respond with the new note
    response.json(note)
})



// get request for a specific note
// the ':id' denotes an express parameter
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id) //find is like filter but for one object
    
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})


// delete request of a specific note
// if the resource exists return a status code 204, 'no content'
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id) //this is what the react state will likely see
    //we would also use the backend to update the database!

    response.status(204).end()
})
// there is no consensus for what status code should be 
// returned to a delete request if the resource does not exist

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})