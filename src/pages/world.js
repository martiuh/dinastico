import React from 'react'
import { Link } from '@reach/router'
import GreetingAmongWorlds from '../component/GreetingAmongWorlds'

export default class World extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 25
    }
  }
  render() {
    const { count } = this.state
    return (
      <main>
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
