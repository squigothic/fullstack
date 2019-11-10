import { gql } from 'apollo-boost'

export const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  {
    allBooks {
      title
      genres
      author {
        name
      }
      published
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query booksByGenre($genre: [String!]) {
    allBooks(genre: $genre) {
      title
      genres
      author {
        name
      }
      published
    }
  }
`
