import React from 'react'
import axios from 'axios'

import Layout from '../component/Layout'

import '../css/index'

export const unoapi = axios.create({
  baseURL: 'https://unobrokers.com/wp-json/wp/v2'
})

const MovieCard = ({ title, image }) => (
  <div className='movieCard'>
    <h1
      dangerouslySetInnerHTML={{ __html: title.rendered }}
    />
    <img src={image} alt={title.rendered} />
  </div>
)

MovieCard.defaultProps = {
  title: {
    rendered: ''
  },
  image: ''
}

export default class extends React.Component {
  state = {
    movies: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  componentDidMount() {
    this.getMovies() //
  }

  getMovies = () => {
    unoapi.get('/movies')
      .then(({ data }) => this.setState({ movies: data }))
  }

  render() {
    const { movies } = this.state
    return (
      <Layout>
        <div className='box'>
          <h1>Great Movies</h1>
          {movies.map(movie => {
            if (typeof movie === 'number') {
              return <MovieCard key={movie} />
            }
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                image={movie.acf.main_image.sizes.thumbnail}
              />
            )
          })}
        </div>
      </Layout>
    )
  }
}
