import React from 'react'
import unoapi from 'unoapi'
import Link from 'dinastico-link'

import MovieCard from './MovieCard'

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
    if (!fetched) {
      return <MovieCard />
    }
    return (
      <main>
        <MovieCard
          {...movie}
          images={movie.acf.main_image.sizes}
          description={movie.acf.description}
        />
        <Link to='/'>
          De vuela a inicio
        </Link>
      </main>
    )
  }
}