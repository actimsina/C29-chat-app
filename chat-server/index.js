const express = require('express')
const app = express()
const port = 4000
const http = require('http').Server(app)

const io = require('socket.io')(http, {
    cors: {origin: "http://localhost:3000"}
})

io.on('connection', (socket) => {
    console.log(`${socket.id} is connected`)
    
    socket.on('message', (data) => {
        console.log(data)
        
        io.emit('reply', data)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} is disconnected`)
    })
})

app.get('/api', (req, res) => {
    res.json({
        message: "Hello world"
    })
})

http.listen(port, 
    () => console.log(`app is running on port ${port}`))