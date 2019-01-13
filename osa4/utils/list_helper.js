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
  const result = []

  // käydään läpi koko lista ja etsitään montako blogia kirjoittajalla on
  blogs.forEach( blog => {
    const author = blog.author
    console.log('Kirjoittaja: ', author)
    //suodatetaan listaa ja tallennetaan kirjoittajan blogien määrä muuttujaan
    const numberOfBlogs = blogs.filter( singleBlog => singleBlog.author === author).length
    console.log('Kirjoittajan blogien lukumäärä: ', numberOfBlogs)
    // katsotaan onko käsiteltävä kirjoittaja tuotteliaampi kuin aiempi johtaja
    if (numberOfBlogs > mostProductive) {
      console.log('Tuottavampi kuin verrokki: true')
      //jos on, tarkistetaan ettei kirjoittajaa jo ole listalla
      console.log('Resultin sisältö ennen tarkistus: ', result)
      if (result.filter( oldBlog => oldBlog.author === author).length === 0) {
        console.log('Ei vielä löydy listalle, lisätään')
        const productiveAuthor = {
          author: blog.author,
          blogs: numberOfBlogs
        }
        console.log('Lisätään listalle: ', productiveAuthor)
        result.push(productiveAuthor)
        console.log('Resultin sisälön pushin jälkeen: ', result)
      }
    }

  })

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
