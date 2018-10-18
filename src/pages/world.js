import React from 'react'

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
      <h1
        onClick={() => this.setState({ count: count + 1})}
      >
          World +{count}
      </h1>
    )
  }
}
