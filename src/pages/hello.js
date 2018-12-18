import React from 'react'
import Layout from '../component/Layout'
import GreetingAmongWorlds from '../component/GreetingAmongWorlds'

export default class Hello extends React.Component {
  state = {
    toggleName: false
  }

  toggleName = () => this.setState(p => ({
    toggleName: !p.toggleName
  }))

  render() {
    const { toggleName } = this.state

    return (
      <Layout>
        <main style={{ backgroundColor: 'red' }}>
          <h1>Hola soy: {!toggleName ? 'Tonatiuh González' : 'González, Tonatiuh'}</h1>
          <button type='button' aria-label='Change name' onClick={this.toggleName}> Change Name </button>
        </main>
      </Layout>
    )
  }
}
