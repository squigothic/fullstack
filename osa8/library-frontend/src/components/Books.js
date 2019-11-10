import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ALL_BOOKS } from '../gql/queries'
import { BOOKS_BY_GENRE } from '../gql/queries'


const Books = props => {
  const [books, setBooks] = useState(null)
  const getBooks = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState(null)
  const [allGenres, setAllGenres] = useState(null)

  useEffect(() => {
    if (getBooks.data) {
      const allBooks = getBooks.data.allBooks
      setBooks(allBooks)
      const nonUniqueGenres = allBooks.reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue.genres)
      }, [])
      setAllGenres([...new Set(nonUniqueGenres)])
    }
  }, [getBooks])

  useEffect(() => {
    console.log('clientin sisältö: ', props.client)
    const getSelectedGenres = async () => {
      const response = await props.client.query({
        query: BOOKS_BY_GENRE,
        variables: { genre: [genre] }
      })
      console.log('response: ', response)
      setBooks(response.data.allBooks)
    }
    if (genre) {
      getSelectedGenres()
    }
  }, [genre, setBooks, props.client])

  const clearChoice = () => {
    setGenre(null)
    setBooks(getBooks.data.allBooks)
  }

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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      {genre && <button onClick={() => clearChoice()}>all genres</button>}
    </div>
  )
}

export default Books
