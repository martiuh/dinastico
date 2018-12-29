import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'

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
        <Helmet title='Greeting is the best!!!' />
        <main style={{ backgroundColor: 'red' }}>
          <h1>Hola soy: {!toggleName ? 'Tonatiuh González' : 'González, Tonatiuh'}</h1>
          <button type='button' aria-label='Change name' onClick={this.toggleName}> Change Name </button>
        </main>
      </Layout>
    )
  }
}
