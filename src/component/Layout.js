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
          const request = '/hello'
          const nextCompo = universal(import(`${__dirname}/../pages${request}`))
          nextCompo.preload()
            .then(loaded => {
              navigate(request)
            })
            .catch(err => console.log(err))
        }}
      >
        Hello
      </a>
      <a
        to='/world'
        onClick={() => {
          const request = '/world'
          const nextCompo = universal(import(`${__dirname}/../pages${request}`))
          nextCompo.preload()
            .then(loaded => {
              navigate(request)
            })
            .catch(err => console.log(err))
        }}
      >
        World
      </a>
      <a
        to='/msg'
        onClick={() => {
          const request = 'msg'
          const nextCompo = universal(import(`${__dirname}/../pages/${request}`))
          nextCompo.preload()
            .then(loaded => {
              navigate('/msg')
            })
            .catch(err => console.log(err))
        }}
      >
        Msg
      </a>
    </nav>
    {children}
  </React.Fragment>
)
