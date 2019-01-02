import React from 'react'
import Link from 'dinastico-link'
import Helmet from 'react-helmet'
import animeapi from 'animeapi'

import AnimeCard from '../components/AnimeCard'
import Layout from '../components/Layout'
import '../css/index.scss'

export default class extends React.Component {
  state = {
    recommendations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    focus: 1
  }

  componentDidMount() {
    this.getRecommendations() //
  }

  getRecommendations = () => {
    animeapi.get('/anime/1/recommendations')
      .then(({ data }) => this.setState({
        recommendations: data.recommendations
      }))
  }

  render() {
    const { recommendations, focus } = this.state
    const focusedRecommendations = recommendations.slice(0, 10 * focus)
    return (
      <Layout>
        <div className='box'>
          <Helmet
            title='Dinapedia'
            meta={[{
              name: 'title',
              description: 'Dinapedia!!!'
            }]}
          />
          <h1>Cool Anime!!!</h1>
          <div className='recommendations'>
            {focusedRecommendations.map(anime => {
              if (typeof anime === 'number') {
                return <AnimeCard key={anime} />
              }
              return (
                <AnimeCard key={anime.mal_id} {...anime} />
              )
            })}
          </div>
        </div>
      </Layout>
    )
  }
}
