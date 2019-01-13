// käytetty aika noin 7 tuntia tehtävät 4.3-4.7 ??

const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce( (sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map( blog => blog.likes))
  const blogsWithMostLikes = blogs.filter( blog => blog.likes === mostLikes)
  const result = []

  blogsWithMostLikes.forEach( blog => {
    const modifiedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }

    result.push(modifiedBlog)
  })

  return result
}

const mostBlogs = (blogs) => {

  const mostProductive = 0
  let result = []

  const uniqueWriters = [...new Set(blogs.map( b => b.author))]
  // käydään läpi koko lista ja etsitään montako blogia kirjoittajalla on

  uniqueWriters.forEach( author => {
    //suodatetaan listaa ja tallennetaan kirjoittajan blogien määrä muuttujaan
    const numberOfBlogs = blogs.filter( singleBlog => singleBlog.author === author).length

    // katsotaan onko käsiteltävä kirjoittaja tuotteliaampi kuin aiempi johtaja
    if (numberOfBlogs > mostProductive) {
      result = [
        {
          author: author,
          blogs: numberOfBlogs
        }
      ]


    } else if (numberOfBlogs === mostProductive) {
      const newWriter = {
        author,
        blogs: numberOfBlogs
      }
      result.push(newWriter)
    }

  })

  return result
}

const mostLikes = (blogs) => {
  const uniqueWriters = [...new Set(blogs.map( b => b.author))]
  const mostLiked = 0
  let result = []

  uniqueWriters.forEach( writer => {
    const blogsByWriter = blogs.filter( blog => blog.author === writer)
    const sumOfLikes = blogsByWriter.reduce( (sum, blog) => sum + blog.likes, 0)
    if (sumOfLikes > mostLiked) {
      result = [
        {
          author: writer,
          likes: sumOfLikes
        }
      ]
    } else if (sumOfLikes === mostLiked) {
      const newWriter = {
        author: writer,
        likes: sumOfLikes
      }
      result.push(newWriter)
    }
  })
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
