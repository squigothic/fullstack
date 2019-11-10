import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'

import { ALL_BOOKS } from '../gql/queries'
import { BOOKS_BY_GENRE } from '../gql/queries'


const Books = props => {
  const [books, setBooks] = useState(null)
  const getBooks = useQuery(ALL_BOOKS)
  const [getGenres, { loading, data, refetch, called }] = useLazyQuery(BOOKS_BY_GENRE)
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
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data, setBooks])

  const setGenreView = (genreToShow) => {
    if (called) {
      refetch({
        variables: {
          genre: [genreToShow]
        }
      })
    }
    getGenres({
      variables: {
        genre: [genreToShow]
      }
    })
  }

  if (loading) return <p>loading...</p>

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
      {allGenres.map(g => <button key={g} onClick={() => setGenreView(g)}>{g}</button>)}
      {data && <button onClick={() => setBooks(getBooks.data.allBooks)}>all genres</button>}
    </div>
  )
}

export default Books
