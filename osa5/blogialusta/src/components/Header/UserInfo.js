import React from 'react'
import styled from 'styled-components'

const UserInfoWrapper = styled.div`
  width: 10em;
  padding: 0px 15px;
  height: 5em;
  line-height: 5em;
`

const UserInfo = ({ username, clearLocalStorage }) => (
  <UserInfoWrapper>
    {username} logged in <button onClick={clearLocalStorage}>log out</button>
  </UserInfoWrapper>
)

export default UserInfo
