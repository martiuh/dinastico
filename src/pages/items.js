import React from 'react'
import { Router } from '@reach/router'
import Layout from '../component/Layout'

function Item() {
  return <h1>Salute My Friends.js</h1>
}

export default function ItemRouter() {
  return (
    <Layout>
      <Router>
        <Item path='/' />
      </Router>
    </Layout>
  )
}
