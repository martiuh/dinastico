import React from 'react'
import { Link, navigate } from '@reach/router'

import { getPage } from '../utils'
import './Layout.css'
// import EstaticoLink from './EstaticoLink'

function CustomLink(props) {
  const { to, onClick, ...rest } = props
  return (
    <Link
      to={to}
      onClick={event => {
        event.preventDefault()
        console.log(getPage(to))
        onClick && onClick(event)
        navigate(to)
      }}
      {...rest}
    />
  )
}

export default ({ children }) => (
  <header>
    <nav className='navbar'>
      <CustomLink to='/'>Home</CustomLink>
      <CustomLink to='/hello'>Hello</CustomLink>
      <a href='/world'>World</a>
      <a href='/msg'>Msg</a>
    </nav>
    {children}
  </header>
)
