import React from 'react'
import { Link } from '@reach/router'

export default ({ children }) => (
  <header>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/hello'>Hello</Link>
      <Link to='/world'>World</Link>
    </nav>
    {children}
  </header>
)
