import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'

import { ALL_AUTHORS } from '../gql/queries'
import SetBirtYear from './SetBirthYear'

const Authors = props => {
  const [authors, setAuthors] = useState(null)
  const getAuthors = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (getAuthors.data) {
      setAuthors(getAuthors.data.allAuthors)
    }
  }, [getAuthors])

  if (!props.show || !authors) {
    return null
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirtYear />
    </div>
  )
}

export default Authors
