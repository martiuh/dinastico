import React from 'react'
import { Link, Router } from '@reach/router'
import universal from 'react-universal-component'

const Loading = () => <h1>...</h1>
const ErrorComponent = () => <h1>Error :(</h1>

const universalOpts = {
  loading: Loading,
  error: ErrorComponent,
  minDelay: 0
}

const UniversalComponent = universal(({ page }) => import(`${__dirname}/pages/${page}`), universalOpts)

const UniversalIndex = universal(() => import(`${__dirname}/pages/index`), universalOpts)
const UniversalPage = ({ path }) => <UniversalComponent path={path} page={path.split('/')[0]} />

const FourOFour = () => (
  <div>
    404 Not Found
    <Link to='/'>Go to home</Link>
  </div>
)

export default function Layout() {
  const EstaticoRouter = () => (
    <Router>
      <UniversalIndex path='/' />
      <UniversalPage path='hello' />
      <UniversalPage path='world/*' />
      <UniversalPage path='msg/*' />
      <UniversalPage path='pendientes' />
      <FourOFour path='*' />
    </Router>
  )

  return (
    <React.Fragment>
      <EstaticoRouter />
    </React.Fragment>
  )
}
