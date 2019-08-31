import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { logoutUser } from '../../reducers/userReducer'

import UserInfo from './UserInfo'
import HeaderButton from './HeaderButton'

const HeaderContainer = styled.div`
  height: 5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #81d2f7;
  margin-bottom: 15px;
  border-bottom: 1px solid black;
  padding-left: 20px;
`

const ButtonContainer = styled.div`
  height: 70%;
  display: flex;
`

const Header = ({ user, logoutUser }) => {
  const clearLocalStorage = () => {
    window.localStorage.removeItem('loggedBlogUser')
    logoutUser()
  }

  const buttons = [
    {
      site: '/',
      title: 'Frontpage',
    },
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
      <ButtonContainer>
        {buttons.map(button => (
          <HeaderButton key={button.title} target={button} user={user} />
        ))}
      </ButtonContainer>
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
