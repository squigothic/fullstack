const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  console.log('saatiin reset-pyyntö')
  console.log('body: ', request.body.options)
  const body = request.body
  console.log('blogs: ', body.options.blogs)
  if (body.options.blogs === true) {
    await Blog.deleteMany({})
    console.log('poistettiin blogit')
  }
  console.log('users: ', body.options.users)
  if (body.options.users === true) {
    await User.deleteMany({})
    console.log('poistettiin käyttäjät')
  }
  response.status(204).end()
})

module.exports = router
