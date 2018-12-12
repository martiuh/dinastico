import React from 'react'
import unoapi from 'unoapi'
import Link from 'dinastico-link'

import MovieCard from '../component/MovieCard'
import Layout from '../component/Layout'
import '../css/index.css'

export default class extends React.Component {
  state = {
    movies: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  componentDidMount() {
    window.scrollTo(0, 0)
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
          <h1>Star Wars - The greatest movies ever!!!</h1>
          {/* <MovieCard /> */}
          {movies.map(movie => {
            if (typeof movie === 'number') {
              return <MovieCard key={movie} />
            }
            return (
              <React.Fragment key={movie.id}>
                <MovieCard
                  title={movie.title}
                  images={movie.acf.main_image.sizes}
                  id={movie.id}
                />
                <Link to={`/movies/${movie.id}`}>Entrar</Link>
              </React.Fragment>
            )
          })}
        </div>
      </Layout>
    )
  }
}
