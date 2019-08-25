import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { logoutUser } from '../../reducers/userReducer'

import Logo from './Logo'
import UserInfo from './UserInfo'
import HeaderButton from './HeaderButton'

const HeaderContainer = styled.div`
  height: 5em;
  display: flex;
  justify-content: space-between;
  background: #81d2f7;
  margin-bottom: 15px;
  border-bottom: 1px solid black;
`

const Header = ({ user, logoutUser }) => {
  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    logoutUser()
  }

  const buttons = [
    {
      site: '/users/' + user.id,
      title: 'My blogs',
    },
    {
      site: '/users',
      title: 'Users',
    },
  ]

  return (
    <HeaderContainer>
      <Logo />
      {buttons.map(button => (
        <HeaderButton target={button} user={user} />
      ))}
      <UserInfo
        username={user.username}
        clearLocalStorage={clearLocalStorage}
      />
    </HeaderContainer>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  logoutUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
