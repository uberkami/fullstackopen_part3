require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')
const morgan = require('morgan')
// const cors = require('cors')

app.use(express.static('build'))
// app.use(cors())
app.use(bodyParser.json())

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :body'))

app.get('/api/persons', (req, res) => {
    // console.log("Person", Person)
    Person.find({}).then(pers => {
        // console.log('pers', pers)
        // person list is returned without _id and _v, id is set to _id
        res.json(pers.map(p => p.toJSON()))
    })
})

app.get('/info', (req, res) => {
    const time = Date(Date.now())
    const count = 0
    Person.find({}).then(pers => {count += 1})
    console.log('count', count, typeof(count))
    res.send(`<div>Phonebook has info for ${count} people</div>
            <div>${time}</div>`)
})


app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id)
        .then(pers => {
            if (pers) {
                response.json(pers.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error);
            return next(error)
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const deleteId = request.params.id
    Person.findByIdAndDelete(deleteId)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
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
    person.save().then(savedNote => {
        response.json(savedNote.toJSON())
    })
})
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})


app.get('/', (req, res) => {
    res.send(
        '<h1>Hello World!?</h1><a href="/info">Info</a>')
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})