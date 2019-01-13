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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
