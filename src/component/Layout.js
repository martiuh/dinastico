import React from 'react'
import { Link, navigate } from '@reach/router'

import { getPage } from '../utils'
import './Layout.css'
// import EstaticoLink from './EstaticoLink'

class CustomLink extends React.Component {
  render() {
    const { to, onClick, ...props } = this.props
    console.log({ to, props })
    return(
      <Link
        to={to}
        onClick={event => {
          event.preventDefault()
          alert(getPage(to))
          onClick && onClick(event)
          navigate(to)
        }}
        {...props}
      />
    )
  }
}
export default ({ children }) => (
  <header>
    <nav className='navbar'>
      <CustomLink to='/'> Home </CustomLink>
      <CustomLink
        to='/hello'
      >
        Hello
      </CustomLink>
      <a
        href='/world'
      >
        World
      </a>
      <a
        href='/msg'
      >
        Msg
      </a>
    </nav>
    {children}
  </header>
)
