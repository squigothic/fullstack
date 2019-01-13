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
      //jos on, tarkistetaan ettei kirjoittajaa jo ole listalla
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
  const favoriteAuthor = favoriteBlog(blogs)
  if (favoriteAuthor.length === 1) {
    const mostLiked = favoriteAuthor[0].author
    const allByFavorite = blogs.filter(blog => blog.author === mostLiked)
    const sumOfLikes = allByFavorite.reduce( (sum, blog) => sum + blog.likes, 0)
    const result = [
      {
        author: mostLiked,
        likes: sumOfLikes
      }
    ]
    return result
  }
  console.log('Tulos: ', favoriteAuthor)
  return favoriteAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
