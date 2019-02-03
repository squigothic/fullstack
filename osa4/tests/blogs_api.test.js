const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helpers')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('general tests for api', async () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await helper.blogsInDb()

    expect(response.length).toBe(helper.initialBlogs.length)
  })

  test('a specifig blog is within the returned blogs', async () => {
    const response = await helper.blogsInDb()

    const contents = response.map(r => r.title)

    expect(contents).toContain('Kaisa-Orvokin heppasaitti')
  })

  test('blog object includes field id which is defined', async () => {
    const response = await helper.blogsInDb()

    const firstBlog = response[0]

    expect(firstBlog.id).toBeDefined()
  })

  test('adding a valid blog via post request works', async () => {
    const newBlog = {
      title: 'Express-palvelimen testaus jestillä',
      author: 'Matti Nykänen',
      url: 'nykanen.fi'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(contents).toContain('Express-palvelimen testaus jestillä')
  })

  test('blog without title or author is not added', async () => {
    const newBlog = {}

    const initialBlogs = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await helper.blogsInDb()

    expect(response.length).toBe(initialBlogs.length)
  })

  test('it blog has no likes defined, 0 is added', async () => {
    const newBlog = {
      title: 'Keskimaan Mattikoulun villit vuodet',
      author: 'Masa',
      url: 'mattikoulu.net'
    }

    const resultOfPost = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(resultOfPost.body.likes).toBe(0)
  })

  test('blog without title and url will be responded with 400 bad request', async () => {
    const newBlog = {
      author: 'unknown',
      likes: 200
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
})

describe('deletion of a blog', async () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/delete/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(b => b.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('modifying the likes of existing blog', async () => {
  test('increases the number of likes by one', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/update/${blogToUpdate.id}`)
      .expect(200)

    const afterUpdate = await helper.blogsInDb()
    const updatedBlog = afterUpdate.filter(b => b.id === blogToUpdate.id)

    expect(updatedBlog[0].likes).toBe(blogToUpdate.likes + 1)

  })
})

afterAll(() => {
  mongoose.connection.close()
})