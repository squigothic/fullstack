const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
]

const multipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]



describe('total likes', () => {
  test('When list has only one blog the result should equal the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7)
  })

  test('When list has multiple blogs, sum of likes should be returned', () => {
    expect(listHelper.totalLikes(multipleBlogs)).toBe(48)
  })

})


describe('the blog(s) with most likes', () => {
  test('When list has only one blog, that blog should be returned', () => {
    const result = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7
      }
    ]
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(result)
  })

  test('When multiple blogs, should return all with most likes ', () => {
    const result = [
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      },
      {
        author: 'Robert C. Martin',
        likes: 12,
        title: 'TDD harms architecture'
      }
    ]
    expect(listHelper.favoriteBlog(multipleBlogs)).toEqual(result)
  })

})

describe('Most liked and productive authors', () => {
  test('When list has only one blog, that blog shoudl be returned', () => {
    const result = [
      {
        author: 'Michael Chan',
        blogs: 1
      }
    ]
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual(result)
  })

  test('When multiple blogs, should return all authors with most blogs', () => {
    const result = [

    ]
  })
})