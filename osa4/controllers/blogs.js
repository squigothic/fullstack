const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {

  const body = request.body

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(400).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({ error: 'required field missing' })
    }

    if (blog.likes === undefined) {
      blog.likes = 0
    }


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

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
