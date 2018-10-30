import React from 'react'
import { Router, Link } from '@reach/router'

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
      <React.Fragment>
        <h1
          onClick={() => this.setState({ count: count + 1})}
        >
            World +{count}
        </h1>
        <Link to={`${count}`}>Want to know hoy much you worlded</Link>
      </React.Fragment>
    )
  }
}

export default () => (
  <Router>
    <World path='/' />
    <YouWorlded path=':worlded' />
  </Router>
)
