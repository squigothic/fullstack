const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

const mongoUrl = process.env.DB_HOST
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('Connected to databse: ', process.env.DB_HOST)
  })

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})