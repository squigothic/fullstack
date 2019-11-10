import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { BOOKS_BY_GENRE } from '../gql/queries'

const Recommendations = props => {
  const [genres, setGenres] = useState(null)
  const getGenres = useQuery(BOOKS_BY_GENRE, {})
}

export default Recommendations
