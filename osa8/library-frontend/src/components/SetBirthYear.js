import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_AUTHOR } from '../gql/mutations'
import { ALL_AUTHORS } from '../gql/queries'

const SetBirthYear = ({ authors }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async event => {
    event.preventDefault()
    await editAuthor({
      variables: { name, setBornTo: born },
    })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select
            value={authors[0].name}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(author => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
