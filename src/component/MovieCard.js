/* eslint-disable react/no-danger */
import React from 'react'

import './MovieCard.scss'

export default function MovieCard({ title, images, description }) {
  return (
    <div className='movieCard'>
      <h1
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      />
      <img
        src={images.thumbnail}
        alt={title.rendered}
      />
      <p>
        <strong
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </p>
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
  description: '',

}
