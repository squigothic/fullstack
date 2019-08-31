import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavButtonBox = styled.div`
  line-height: 4em;
  padding: 0 10px;
  border-radius: 2px;
  border: 1px solid black;
  margin: 0 5px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 22px;
`

const HeaderButton = ({ target }) => {
  return (
    <NavButtonBox>
      <StyledLink to={`${target.site}`}>{target.title}</StyledLink>
    </NavButtonBox>
  )
}

export default HeaderButton
