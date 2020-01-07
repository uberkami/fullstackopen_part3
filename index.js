const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
app.use(bodyParser.json())

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :body'))

let persons = [{
    "persons": [
        {
            "name": "§§delham",
            "number": "99923415689",
            "id": 2
        },
        {
            "name": "Eljjm",
            "number": "122223415689",
            "id": 4
        },
        {
            "name": "Elham",
            "number": "123415689",
            "id": 5
        },
        {
            "name": "Name 11",
            "number": "asdasdasd",
            "id": 6
        },
        {
            "name": "Maleck",
            "number": "123456852963",
            "id": 7
        }
    ]
}]

app.get('/info', (req, res) => {
    const time = Date(Date.now())
    const listLength = persons[0].persons.length
    res.send(`<div>Phonebook has info for ${listLength} people</div>
            <div>${time}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons[0].persons.find(pers => {
        return (pers.id === id)
    })
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    person = persons[0].persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {

    let genId = Math.floor(Math.random() * 100);
    let personFound = persons[0].persons.find(pers => pers.id === genId)
    while (personFound) {
        genId = Math.floor(Math.random() * 100);
        personFound = persons[0].persons.find(pers => pers.id === genId)
    }
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    }
    const personNameFound = persons[0].persons.find(pers => pers.name === body.name)

    if (personNameFound) {
        return response.status(403).json({
            error: 'Name already exist'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: genId
    }

    persons = persons.concat(person)
    response.json(person)
})

app.get('/', (req, res) => {
    res.send(
        '<h1>Hello World!?</h1><a href="/info">Info</a>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/persons', (req, res) => {
    res.json(persons)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)