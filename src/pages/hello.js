import React from 'react'

export default class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nombre: 'Tonatiuh González'
    }
  }
  render() {
    return (
      <main style={{ width: '100vw', backgroundColor: 'red' }}>        
        <h1>hola a todos {this.state.nombre}</h1>
      </main>
    )
  }
}
