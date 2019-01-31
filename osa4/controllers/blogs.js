const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {

  const blog = new Blog(request.body)

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({ error: 'required field missing' })
  }

  if (blog.likes === undefined) {
    blog.likes = 0
  }
  try {
    await blog.save()

    response.status(201).json(blog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
