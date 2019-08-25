import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LogoBox = styled.div`
  color: black;
  width: 7em;
  padding-left: 10px;
  font-size: 20px;
  text-decoration: none;
`

const Logo = () => (
  <LogoBox>
    <Link to="/">
      <h2>Blogs</h2>
    </Link>
  </LogoBox>
)

export default Logo
