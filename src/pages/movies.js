import React from 'react'
import { Router, navigate } from '@reach/router'

import Layout from '../component/Layout'
import Movie from '../component/Movie'

class Movies extends React.Component {
  componentDidMount() {
    navigate('/')
  }

  render() {
    return (
      null
    )
  }
}


export default () => (
  <Layout>
    <Router>
      <Movies path='/' />
      <Movie path=':movieId' />
    </Router>
  </Layout>
)