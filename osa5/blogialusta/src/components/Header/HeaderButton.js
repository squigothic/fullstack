import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavButtonBox = styled.div`
  height: 5em;
  line-height: 5em;
  padding: 0 10px;
`

const HeaderButton = ({ target }) => {
  return (
    <NavButtonBox>
      <Link to={`${target.site}`}>{target.title}</Link>
    </NavButtonBox>
  )
}

export default HeaderButton
