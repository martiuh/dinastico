import React from 'react'
import { Router, Link } from '@reach/router'

import '../css/msg'

function Msg() {
  return (
    <main>
      <h1>Msg.js</h1>
    </main>
  )
}

function MyCustomMessage({ message }) {
  return (
    <main>
      <h3>{message || 'Mensaje pendiente...'}</h3>
      <Link to='/msg'>Back {`<--`}</Link>
    </main>
  )
}

export default () => (
  <React.Fragment>
    <nav className='msg-navbar'>
      <Link to='/'>
        Inicio
      </Link>
      <Link to='/msg/somos-chivas'>
        Somos Chivas
      </Link>
    </nav>
    <Router>
      <Msg path='/' />
      <MyCustomMessage path=':message' />
    </Router>
  </React.Fragment>
)
