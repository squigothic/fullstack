const supertest = require('supertest')
const mongoose = require('mongoose')
const app  = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helpers')

beforeEach(async () => {
  await Blog.remove({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('tests for blogs api', () => {

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

  test('blog without title and url will be respondes with 400 bad request', async () => {
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

afterAll(() => {
  mongoose.connection.close()
})