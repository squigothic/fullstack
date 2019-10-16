import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ALL_BOOKS } from '../gql/queries'

const Books = props => {
  const [books, setBooks] = useState(null)
  const getBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (getBooks.data) {
      console.log('stetaan AllBooks')
      setBooks(getBooks.data.allBooks)
    }
  }, [getBooks])

  if (!props.show || !books) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
