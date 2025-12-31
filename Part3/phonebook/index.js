const express = require('express')
const app = express()
const morgan = require('morgan')


let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

//3.7: Phonebook backend step 7
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}


app.use(express.json())
app.use(morgan('tiny'))
app.use(requestLogger)


// 3.1: Phonebook backend step 1
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//3.3: Phonebook backend step 3
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(object => object.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404)
    }
})

//3.2: Phonebook backend step 2
app.get('/info', (request, response) => {
    const currentDate = new Date()
    response.send(`<div><p>Phonebook has info for ${persons.length} people</p> <p>${currentDate.toString()}</p></div>`)
})

//3.4: Phonebook backend step 4
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// 3.5: Phonebook backend step 5

//get a random integer within range
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => Number(person.id))) : 0
    const newId = getRandomInt(maxId, 100000000)

    return String(newId)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = persons.map(person => person.name)

    //3.6: Phonebook backend step 6
    if (!body.name && !body.number) {
        return response.status(400).json({
            error: 'number and name missing'
        })
    } 
    if (names.includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})