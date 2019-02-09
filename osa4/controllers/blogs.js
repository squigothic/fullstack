const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../controllers/users')

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

  //const user = await User.findById(body.userId)

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

blogsRouter.delete('/delete/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/update/:id', async (request, response, next) => {
  try {
    const blogToUpdate = await Blog.findById(request.params.id)

    const blog = {
      likes: blogToUpdate.likes + 1
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
