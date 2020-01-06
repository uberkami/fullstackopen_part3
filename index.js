const http = require('http')

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Hello World')
// })
let notes = [{
    "persons": [
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

const app = http.createServer(
    (request, response) => {
        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(notes))
    })


const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)