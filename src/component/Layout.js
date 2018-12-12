import React from 'react'
import Link from 'dinastico-link'

import '../css/normalize.css'
import './Layout.scss'
// import EstaticoLink from './EstaticoLink'

export default ({ children }) => (
  <header>
    <nav className='navbar'>
      <Link to='/'>Home</Link>
      <Link to='/hello'>Hello</Link>
      <Link to='/msg'>Msg</Link>
    </nav>
    {children}
  </header>
)
