import React from 'react'
import axios from 'axios'
import { Link } from '@reach/router'

import CommentCard from './CommentCard'

export default class MyCustomMessage extends React.Component {
  state = {
    comment: {},
    fetched: false
  }

  componentDidMount() {
    const { message } = this.props
    if (typeof parseInt(message, 10) === 'number') {
      axios.get(`https://jsonplaceholder.typicode.com/comments/${message}`)
        .then(({ data }) => {
          this.setState({ comment: data, fetched: true })
        })
    }
  }

  render() {
    const { comment, fetched } = this.state
    return (
      <main>
        {!fetched ? <CommentCard /> : (
          <CommentCard key={comment.id} {...comment} />
        )}
        <Link to='/msg'>
          Back
          {' '}
          {'<--'}
        </Link>
      </main>
    )
  }
}