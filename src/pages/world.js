import React from 'react'
import { Link } from '@reach/router'
import GreetingAmongWorlds from '../component/GreetingAmongWorlds'

const YouWorlded = ({ worlded }) => {
  return (
    <React.Fragment>
      <h1>You worlded {worlded || 'X'}</h1>
      <Link to='/world'>Go back to world 0!</Link>
    </React.Fragment>
  )
}

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
        <h1
          onClick={() => this.setState({ count: count + 1})}
        >
            World +{count}
        </h1>
        <Link to='/'>Incio</Link>
        <GreetingAmongWorlds />
      </main>
    )
  }
}

export default () => (
  <Router>
    <World path='/' />
    <YouWorlded path=':worlded' />
  </Router>
)
