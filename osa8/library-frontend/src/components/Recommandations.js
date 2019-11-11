import React, { useState, useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { BOOKS_BY_GENRE } from '../gql/queries'
import { ME } from '../gql/queries'

const Recommendations = ({ show }) => {
  const { loading: userLoading, data: userData } = useQuery(ME)
  const [callback, setCallback] = useState(false)
  const [getGenres, { data, loading }] = useLazyQuery(BOOKS_BY_GENRE, { onCompleted: () => setCallback(true) })

  useEffect(() => {
    if (userData) {
      getGenres({ variables: { genre: userData.me.favoriteGenre } })
    }
  }, [getGenres, userData])

  if (!show) return null

  if (loading || userLoading || !callback) return <p>loading..</p>

  return (
    <div>
      <h2>Books in genre {userData.me.favoriteGenre}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
