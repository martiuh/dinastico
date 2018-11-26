import React from 'react'
import { Router } from '@reach/router'
import Link from 'dinastico-link'

import GreetingAmongWorlds from '../component/GreetingAmongWorlds'

const YouWorlded = ({ worlded }) => (
  <React.Fragment>
    <h1>You worlded {worlded || 'X'}</h1>
    <Link to='/world'>Go back to world 0!</Link>
  </React.Fragment>
)

class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    const { count } = this.state
    return (
      <main>
        <h1
          onClick={() => this.setState({ count: count + 1 })}
        >
            World +{count}
        </h1>
        <Link to='/'>Incio</Link>
        <GreetingAmongWorlds />
      </main>
    )
  }
}

const America = ({ children }) => (
  <div>
    <h1>Continent Americano</h1>
    {children}
  </div>
)

const Mexico = () => (
  <h1>Viva México!!!</h1>
)

export default () => (
  <Router>
    <World path='/' />
    <America path='america'>
      <Mexico path='mexico' />
    </America>
    <YouWorlded path=':worlded' />
  </Router>
)
