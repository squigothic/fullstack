import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommandations'

import { BOOK_ADDED } from './gql/subscriptions'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const checkIfLoggedIn = () => {
    if (!token && localStorage.getItem('library-user-token')) {
      setToken(localStorage.getItem('library-user-token'))
    }
  }

  useEffect(() => {
    checkIfLoggedIn()
  })

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded.title
      window.alert('Tietokantaan lisättiin kirja ', addedBook)
    }
  })

  if (!token) {
    return (
      <LoginForm setToken={(token) => setToken(token)} />
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <Recommendations show={page === 'recommendations'} />
      <NewBook show={page === 'add'} setPage={setPage} />

    </div>
  )
}

export default App
