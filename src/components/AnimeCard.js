import React from 'react'

import './AnimeCard.scss'

class Img extends React.Component {
  state = {
    loaded: null
  }

  componentDidMount() {
    const { src } = this.props
    const picture = new Image()
    picture.src = src
    picture.onLoad = setTimeout(() => this.setState({ loaded: true }), 100)
  }

  render() {
    const { loaded } = this.state
    const { alt, ...props } = this.props
    if (!loaded) {
      return null
    }
    return (
      <img alt={alt} {...props} />
    )
  }
}

export default function AnimeCard({ title, image_url }) {
  return (
    <div className='anime-card'>
      <h3 className='anime-title'>
        {title && <strong>{title}</strong>}
      </h3>
      <figure className='anime-figure'>
        {image_url && (
          <Img src={image_url} alt={title} />
        )}
      </figure>
    </div>
  )
}

AnimeCard.defaultProps = {
  title: ''
}
