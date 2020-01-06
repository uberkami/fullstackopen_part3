// const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World')
// })
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
    console.log("persons length", listLength)
    console.log("persons", persons[0])
    console.log(time)
    res.send(`<div>Phonebook has info for ${listLength} people</div>
            <div>${time}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log('id, typeof', id, typeof (id))
    const person = persons[0].persons.find(pers => {
        console.log('find', pers, pers.id, typeof (pers.id))
        console.log('pers.id===id', pers.id === id)
        return (pers.id === id)
    })
    console.log('person', person)
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
    console.log('personFound', personFound)
    while (personFound) {
        genId = Math.floor(Math.random() * 100);
        personFound = persons[0].persons.find(pers => pers.id === genId)
        console.log(genId)
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

    console.log("person before id", person)
    console.log("person after id", person)
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


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)