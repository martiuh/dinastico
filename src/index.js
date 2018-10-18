import React from 'react'
import { hydrate } from 'react-dom'
import { Link, Router } from '@reach/router'
import axios from 'axios'
import universal from 'react-universal-component'
import Loadable from 'react-loadable'

import { isServer } from './utils'

// import Home from './pages'
// import Hello from './pages/hello'
// import World from './pages/world'

const Loading = () => <h1>Loading</h1>
const ErrorComponent = () => <h1>Error</h1>

const UniversalComponent = universal(props => import(`${__dirname}/./pages/${props.page}`), {
  loading: Loading,
  error: ErrorComponent
})

const RucIndex = universal(props => import(`${__dirname}/./pages/index`), {
  loading: Loading,
  error: ErrorComponent
})

// const withLoadable = page => Loadable({
//   loading: Loading,
//   loader: () => import(`${__dirname}/./pages/${page}`)
// })
// const HomeAsync = () => withLoadable('index')
// const WorldAsync = () => withLoadable('world')
// const HelloAsync = () => withLoadable('hello')

const HomeAsync = () => <RucIndex />
const HelloAsync = () => <UniversalComponent page='hello' />
const WorldAsync = () => <UniversalComponent page='world' />

console.log('Hola a todos')

export default function Layout({ pages }) {
  const EstaticoRouter = () => (
    <Router>
      <HomeAsync path='/' />
      <HelloAsync path='hello' />
      <WorldAsync path='world' />
    </Router>
  )

  return (
    <React.Fragment>
      <header>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='hello'>Hello</Link>
          <Link to='world'>World</Link>
        </nav>
      </header>
      <EstaticoRouter />
    </React.Fragment>
  )
}


if (typeof window !== 'undefined') {
  console.log('HEHEHE')
  const estaticoRoot = document.getElementById('__estatico')
  hydrate(
    <Layout />,
    estaticoRoot
  )
}
