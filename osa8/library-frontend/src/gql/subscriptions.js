import { gql } from 'apollo-boost'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
      id
    }
  }
`
