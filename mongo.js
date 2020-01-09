const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://first_user:${password}@atlasdb-nz7qo.mongodb.net/people?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)
if (name && number) {

    const randomId = Math.floor(Math.random() * 100)
    const person = new Person({
        name: `${name}`,
        number: `${number}`,
        id: `${randomId}`
    })

    person.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(pers => {
            console.log(pers.name, pers.number)
        })
        mongoose.connection.close()
    })
}