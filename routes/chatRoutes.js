// const asyncHandler = require('express-async-handler')
// const { getResponses, loadChat, addChat } = require('../controllers/chatController')
// const express = require('express')
// const expressEjsLayouts = require('express-ejs-layouts')
// const dotenv = require('dotenv')

// const app = express()
// app.set('view engine', 'ejs')
// app.use(expressEjsLayouts)
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// const setMessage = asyncHandler(async(req, res) => {
//     res.render('index', {
//         layout: "layout/main-layout",
//         title: "Chat bot",
//         key: process.env.TTS_KEY
//     })
// })
// // answer => response.choices[0].message.content

// module.exports = {
//     setMessage
// }