require('dotenv').config()
const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author.js')
const Book = require('./models/book.js')
const uuid = require('uuid/v1')

mongoose.set('useFindAndModify', false)

console.log('connecting to ', process.env.MONGODB_URI)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log('error connecting to mongodb: ', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    titles: [Book]
    id: ID
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: [String]): [Book]
    allAuthors: [Author!]
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = null
      if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } })
      }
      return Book.find({})
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    titles: root => {
      return Book.find({ author: root._id })
    },
    bookCount: async root => {
      const books = await Book.find({ author: root._id })
      return books.length
    },
  },
  Book: {
    author: async root => {
      const author = await Author.findById(root.author)
      return author
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = null
      if (!(await Author.findOne({ name: args.author }))) {
        author = new Author({ name: args.author })
        return await author.save().catch(error => {
          throw new UserInputError(error.message)
        })
      }
      author = await Author.findOne({ name: args.author })
      const book = new Book({
        ...args,
        author: author._id,
      })
      return book.save().catch(error => {
        throw new UserInputError(error.message)
      })
    },
    editAuthor: async (root, args) => {
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      ).catch(error => {
        throw new UserInputError(error.message)
      })
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
