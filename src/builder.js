import React from 'react'
import { hydrate } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Link, Router } from '@reach/router'

import render from './render'
import Test from './pages/hello'
// 1. Get Pages
// 2. Make routes according to filename

const Layout = ({ children, pages }) => (
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

if (typeof global.document !== 'undefined') {
  console.log('YEAHHHHH!!!!')
  const estaticoRoot = document.getElementById('__estatico')
  hydrate(
    <Layout />,
    estaticoRoot
  )
}

export default function(locals) {
  const staticApp = {}
  const { routes } = locals
  const Pages = Object.keys(routes).map(P => ({
    Page: require(`./pages/${routes[P]}`).default,
    path: P
  }))
  const routeName = routes[locals.path]
  const Compo = require(`./pages/${routeName}`).default
  const App = () => (
    <Layout pages={Pages}>
      <Compo />
    </Layout>
  )

  const appString = renderToString(<App />)
  return render(appString)
}
