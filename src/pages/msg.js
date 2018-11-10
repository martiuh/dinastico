import React from 'react'
import { Link, Router } from '@reach/router'
import GreetingAmongWorlds from '../component/GreetingAmongWorlds'

const Mensajeado = ({ saludo }) => (
    <main className='content container'>
      <h1>You digo: {saludo || 'X'}</h1>
      <Link to='/msg' className='button is-success'>Go back to world 0!</Link>
    </main>
  )

class Msg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  render() {
    const { count } = this.state
    return (
      <main>
        <h1
          className='is-size-2'
          onClick={() => this.setState({ count: count + 1})}
        >
            Mensaje Secreto
        </h1>
        <Link to='perrin'>Eres un...</Link>
        <GreetingAmongWorlds />
      </main>
    )
  }
}

export default () => (
  <React.Fragment>
  <nav className='navbar is-warning'>
    <div className="navbar-brand">
      <Link
        to='/'
        className="navbar-item"
      >
        Inicio
      </Link>
      <Link
        className='navbar-item'
        to='eres-un-galleto'
      >
        Mensaje Público
      </Link>
    </div>
  </nav> 
  <Router>
    <Msg path='/' />
    <Mensajeado path=':saludo' />
  </Router>
  </React.Fragment>
)
