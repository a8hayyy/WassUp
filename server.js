const express = require('express')

const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 5000



http.listen(PORT, ()=>{
    console.log(`Server is listning on port ${PORT}`)
})

app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render(__dirname)
})

// Socket
const io = require('socket.io')(http)

io.on('connection' , (socket)=>{
    console.log("connected...")

    socket.on('message', (msg)=>{
        // To Terminal
        // console.log(msg)

        // Send Back to Client Browser
        socket.broadcast.emit('message', msg)
    })
})