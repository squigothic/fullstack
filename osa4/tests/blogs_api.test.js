const supertest = require('supertest')
const { app, server }  = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

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

beforeAll(async () => {
  await Blog.remove({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
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
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('a specifig blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')

    const contents = response.body.map(r => r.title)

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

    const response = await api
      .get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(contents).toContain('Express-palvelimen testaus jestillä')
  })

  test('blog without title or author is not added', async () => {
    const newBlog = {}

    const initialBlogs = await api
      .get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.body.length)
  })


})

afterAll(() => {
  server.close()
})