require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :body'))

app.get('/api/persons', (req, res) => {
    console.log("Person", Person)
    Person.find({}).then(pers => {
        console.log('pers', pers)
        // person list is returned without _id and _v, id is set to _id
        res.json(pers.map(p => p.toJSON()))
    })
})

app.get('/info', (req, res) => {
    const time = Date(Date.now())
    const listLength = persons[0].persons.length
    res.send(`<div>Phonebook has info for ${listLength} people</div>
            <div>${time}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(id).then(pers => {
        response.json(pers.toJSON())
    }
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const deleteId = Number(request.params.id)
    let personFound = persons[0].persons.find(pers => pers.id === deleteId)

    if (personFound) {
        persons[0].persons = persons[0].persons.filter(person => person.id !== deleteId)
        return (response.status(204).end())
    } else {
        return (response.status(404).end())
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    console.log("person in post", person)
    person.save().then(response => {
        response.json(savedNote.toJSON())
    })
})

app.get('/', (req, res) => {
    res.send(
        '<h1>Hello World!?</h1><a href="/info">Info</a>')
})

app.get('/persons', (req, res) => {
    res.json(persons)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})