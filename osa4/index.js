const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then( () => {
    console.log('Connected to databse: ', config.mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

const PORT = config.port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})