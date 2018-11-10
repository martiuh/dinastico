import React from 'react'
import Layout from '../component/Layout'
import GreetingAmongWorlds from '../component/GreetingAmongWorlds'

export default class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nombre: 'Tonatiuh González'
    }
  }

  render() {
    return (
      <Layout>
        <main style={{ width: '100vw', backgroundColor: 'red' }}>
          <h1>hola a todos {this.state.nombre}</h1>
          <GreetingAmongWorlds />
        </main>
      </Layout>
    )
  }
}
