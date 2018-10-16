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
      <h1>hola a todos {this.state.nombre}</h1>
    )
  }
}
