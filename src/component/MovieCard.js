/* eslint-disable react/no-danger */
import React from 'react'

import './MovieCard.scss'

class MoviePic extends React.Component {
  state = {
    image: null,
    showFallback: true
  }

  componentDidMount() {
    const { high, low } = this.props
    const full = new Image()
    full.src = high
    full.onload = () => this.setState({ image: high, showFallback: false })
    const half = new Image()
    half.src = low
    half.onload = () => {
      const { image } = this.state
      if (image === high) {
        return null
      }
      return this.setState({ image: low })
    }
  }

  render() {
    const { image, showFallback } = this.state
    const {
      low,
      alt,
      high,
      styleObj,
      ...props
    } = this.props

    if (!image) {
      return (
        <div
          style={{
            backgroundColor: 'lightgray',
            maxWidth: '400px',
            height: '400px',
            ...styleObj
          }}
        />
      )
    }
    return (
      <img
        className={showFallback ? 'blur-image' : ''}
        src={image}
        alt={alt}
        {...props}
      />
    )
  }
}

export default function MovieCard({ title, images, description }) {
  const { thumbnail, large, medium } = images
  return (
    <div className='movieCard'>
      <h2
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      />
      <MoviePic
        low={medium}
        high={large}
        higher={images['twentyseventeen-featured-image']}
        alt={title.rendered}
        style={{
          width: images['large-width']
        }}
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
    thumbnail: '',
    medium: ''
  },
  description: ''
}
