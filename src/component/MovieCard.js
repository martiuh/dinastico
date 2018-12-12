/* eslint-disable react/no-danger */
import React from 'react'

import './MovieCard.scss'

class MoviePic extends React.Component {
  state = {
    image: null,
    showFallback: true
  }

  componentDidMount() {
    const { high } = this.props
    const full = new Image()
    full.src = high
    full.onload = () => this.setState({ image: high })
  }

  render() {
    const { image } = this.state
    const {
      low,
      alt,
      high,
      ...props
    } = this.props

    return (
      <img
        src={image || low}
        alt={alt}
        {...props}
      />
    )
  }
}

export default function MovieCard({ title, images, description }) {
  const { thumbnail, large } = images
  return (
    <div className='movieCard'>
      <h2
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      />
      <MoviePic
        low={thumbnail}
        high={large}
        alt={title.rendered}
      />
      {description !== '' && (
        <React.Fragment>
          <h4>Description</h4>
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </React.Fragment>
      )}
    </div>
  )
}

MovieCard.defaultProps = {
  title: {
    rendered: ''
  },
  images: {
    thumbnail: ''
  },
  description: ''
}
