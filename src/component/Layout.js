import React from 'react'
import { Link } from '@reach/router'

export default ({ children }) => (
  <React.Fragment>  
    <header>
      <nav className='navbar is-danger'>
        <div className='navbar-brand'>
        <Link to='/' className='navbar-item'>Home</Link>
        <Link to='/hello' className='navbar-item'>Hello</Link>
        <Link to='/msg' className='navbar-item'>Msg</Link>
        </div>
      </nav>
    </header>
    {children}
  </React.Fragment>
)
