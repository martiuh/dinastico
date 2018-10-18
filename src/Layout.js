import React from 'react'
import { hydrate } from 'react-dom'
import { Link, Router } from '@reach/router'
import axios from 'axios'
import universal from 'react-universal-component'
import Loadable from 'react-loadable'

import { isServer } from './utils'

const Loading = () => <h1>Loading</h1>
const ErrorComponent = () => <h1>Error</h1>

const UniversalComponent = universal(props => import(`${__dirname}/./pages/${props.page}`), {
  loading: Loading,
  error: ErrorComponent
})

const RucIndex = universal(props => import(`${__dirname}/./pages/index`), {
  loading: Loading,
  error: ErrorComponent,
  minDelay: 500
})

const HomeAsync = () => <RucIndex />
const HelloAsync = () => <UniversalComponent page='hello' />
const WorldAsync = () => <UniversalComponent page='world' />

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
