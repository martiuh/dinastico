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

  changeName = () => this.setState({ nombre: 'Tonadioro Pérez' })

  render() {
    return (
      <Layout>
        <main style={{ width: '100vw', backgroundColor: 'red' }}>
          <h1>hola a todos {this.state.nombre}</h1>
          <button onClick={this.changeName}> Change Name </button>
          <GreetingAmongWorlds />
        </main>
      </Layout>
    )
  }
}
