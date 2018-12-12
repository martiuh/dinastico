import React from 'react'
import { Router, navigate } from '@reach/router'

import Layout from '../component/Layout'
import Movie from '../subpages/Movie'

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


function MovieId(props) {
  return (
    <main
      style={{
        padding: '10px'
      }}
    >
      <Movie {...props} />
    </main>
  )
}

export default () => (
  <Layout>
    <Router>
      <Movies path='/' />
      <MovieId path=':movieId' />
    </Router>
  </Layout>
)
