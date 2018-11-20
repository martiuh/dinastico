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
    this.getComment()
  }

  componentDidUpdate(prevProps) {
    const { message } = this.props
    if (prevProps.message !== message) {
      this.getComment()
    }
  }

  getComment() {
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
    const { message } = this.props
    let nextMessage = parseInt(message, 10)
    if (typeof nextMessage === 'number') {
      nextMessage += 1
      nextMessage = nextMessage > 10 ? 1 : nextMessage
    }

    return (
      <main>
        <Link to='/msg'>
          Back
          {' '}
          {'<--'}
        </Link>
        {!fetched ? <CommentCard /> : (
          <React.Fragment>
            <CommentCard key={comment.id} {...comment} />
            <Link to={`/msg/${nextMessage}`}>
              {nextMessage === 1 ? 'De vuelta al número 1' : 'Ver siguiente'}
            </Link>
          </React.Fragment>
        )}
      </main>
    )
  }
}
