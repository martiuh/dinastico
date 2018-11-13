import React from 'react'
import { hydrate } from 'react-dom'
import { Link, Router } from '@reach/router'
import axios from 'axios'
import universal from 'react-universal-component'

import Msg from './pages/msg'
import { isServer } from './utils'

const Loading = () => <h1>...</h1>
const ErrorComponent = () => <h1>Error :(</h1>

const universalOpts = {
  loading: Loading,
  error: ErrorComponent,
  minDelay: 0
}

const pagesFolder = pge => `${__dirname}/pages/${pge}`

const UniversalComponent = universal(({ page }) => import(`${__dirname}/pages/${page}`), universalOpts)

const UniversalIndex = universal(props => import(`${__dirname}/pages/index`), universalOpts)
const UniversalPage = ({ path }) => <UniversalComponent path={path} page={path.split('/')[0]} />

const _404 = () => (
  <div>
    404 Not Found
    <Link to='/'>Go to home</Link>
  </div>
)

export default function Layout({ pages }) {
  const EstaticoRouter = () => (
    <Router>
      <UniversalIndex path='/' />
      <UniversalPage path='hello' />
      <UniversalPage path='world/*' />
      <UniversalPage path='msg/*' />
      <UniversalPage path='pendientes' />
      <_404 path='*' />
    </Router>
  )

  return (
    <React.Fragment>
      <EstaticoRouter />
    </React.Fragment>
  )
}
