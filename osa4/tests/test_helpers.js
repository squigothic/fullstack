const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Jari-Petterin kotskasivut',
    author: 'Jari-Petteri',
    url: 'jaripetteri.fi',
    likes: 17
  },
  {
    title: 'Kaisa-Orvokin heppasaitti',
    author: 'Kaisa-Orvokki',
    url: 'heppasaitti.fi',
    likes: '200'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb
}