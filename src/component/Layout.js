import React from 'react'
import { Link, navigate } from '@reach/router'
import universal from 'react-universal-component'

import './Layout.css'
// import EstaticoLink from './EstaticoLink'

export default ({ children }) => (
  <header>
    <nav className='navbar'>
      <Link to='/'>
        Home
      </Link>
      <a
        to='/hello'
        onClick={() => {
          const request = 'hello'
          const nextCompo = universal(import(`${__dirname}/../pages/${request}`))
          nextCompo.preload()
            .then(loaded => {
              console.log(loaded)
              navigate('/hello')
            })
            .catch(err => console.log(err))
        }}
      >
        Hello
      </a>
      <a
        to='/world'
        onClick={() => {
          const request = 'world'
          const nextCompo = universal(import(`${__dirname}/../pages/${request}`))
          nextCompo.preload()
            .then(loaded => {
              console.log(loaded)
              navigate('/world')
            })
            .catch(err => console.log(err))
        }}
      >
        World
      </a>
    </nav>
    {children}
  </header>
)
