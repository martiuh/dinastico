import React from 'react'
import Link from 'dinastico-link'
import Helmet from 'react-helmet'

import '../css/normalize.css'
import './Layout.scss'
// import EstaticoLink from './EstaticoLink'

export default ({ children }) => (
  <header>
    <nav className='navbar'>
      <Helmet>
        <link href='https://fonts.googleapis.com/css?family=Staatliches' rel='stylesheet' />
      </Helmet>
      <Link to='/'>Home</Link>
      <Link to='/hello'>Hello</Link>
      <Link to='/msg'>Msg</Link>
      <Link to='/items'>Items</Link>
    </nav>
    {children}
  </header>
)
