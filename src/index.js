import React from 'react'
import { hydrate } from 'react-dom'
import { Link, Router } from '@reach/router'
import axios from 'axios'

export default function Layout({ children, pages }) {
  return (
    <React.Fragment>
      <header>
        <nav>
          <Router>
            {Array.isArray(pages) && pages.map(({ path, Page }) => <Page path={path} />)}
          </Router>
          <Link to='/'>Home</Link>
          <Link to='hello'>Hello</Link>
          <Link to='world'>World</Link>
        </nav>
      </header>
      {children}
    </React.Fragment>
  )
}

if (typeof global.document !== 'undefined') {
  const estaticoRoot = document.getElementById('__estatico')
  const pages = window.ESTATICO_PAGES
  console.log(pages)
  axios.get('/routes.json').then(res => console.log(res))
  hydrate(
    <Layout />,
    estaticoRoot
  )
}
