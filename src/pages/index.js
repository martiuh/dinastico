import React from 'react'

import { isServer } from '../utils'
import Layout from '../component/Layout'
import '../css'

const baseURL = rest => `https://hidroval-api.pelonchas.net/api${rest}`

export default class Index extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    if (!isServer) {
      fetch(baseURL('/productos'))
        .then(res => res.json())
          .then(products => this.setState({ products }))
        .catch(err => new Error(err))
    }
  }

  render() {
    const { products } = this.state
    return(
      <Layout>
        <main className="content container">  
          <h1>Home.js</h1>
          {products.map(({ images, code }) => (
            <div className='column' key={code}>
              <figure className='is-128x128'>
                <img src={baseURL(`/media/img/download/${images.thumbnail.name}`)} />
              </figure>
            </div>
          ))}
        </main>
      </Layout>      
    )
  }
}
