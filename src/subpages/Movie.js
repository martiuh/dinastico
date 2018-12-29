import React from 'react'
import unoapi from 'unoapi'
import Link from 'dinastico-link'

import MovieCard from '../components/MovieCard'

export default class Movie extends React.Component {
  state = {
    movie: {},
    fetched: false
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getMovie()
  }

  getMovie() {
    const { movieId } = this.props
    unoapi.get(`/movies/${movieId}`)
      .then(({ data }) => this.setMovie(data))
  }

  setMovie(movie) {
    this.setState(p => ({
      movie: Object.assign({}, p.movie, movie),
      fetched: true
    }))
  }

  render() {
    const { movie, fetched } = this.state
    let images = {
      thumbnail: ''
    }
    let description = ''

    if (movie) {
      if (movie.acf) {
        if (movie.acf.main_image) {
          images = movie.acf.main_image.sizes
        }

        if (movie.acf.description) {
          // eslint-disable-next-line prefer-destructuring
          description = movie.acf.description
        }
      }
    }

    return (
      <main>
        <Link to='/'>
          {'<---'} De vuela a inicio
        </Link>
        <MovieCard
          key={fetched.toString()}
          {...movie}
          images={images}
          description={description}
        />
      </main>
    )
  }
}
