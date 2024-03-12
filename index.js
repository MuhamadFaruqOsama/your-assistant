const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
require('dotenv').config()
const PORT = process.env.PORT
const expressEjsLayouts = require('express-ejs-layouts')

const { getResponses } = require('./controllers/chatController')

const app = express()
app.set('view engine', 'ejs')
app.use(expressEjsLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.render('index', {
        layout: "layout/main-layout",
        title: "Chat bot",
        key: process.env.TTS_KEY
    })
})

io.on('connection', (socket) => {
    console.log("User is connected")
    socket.on('chat message', async(msg) => {
        io.emit('chat message', { text: msg , isBotResponse: false})
        let response = await getResponses(msg)
        io.emit('chat message', { text: response.choices[0].message.content, isBotResponse: true })
        // io.emit('chat message', { text: "omaigat", isBotResponse: true })
    })
    socket.on('disconnect', () => {
        console.log(`User disconnected`);
    })
})

server.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}`);
})