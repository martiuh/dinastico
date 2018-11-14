import React from 'react'
import { Router, Link } from '@reach/router'
import axios from 'axios'

import '../css/msg'

const CommentCard = ({ email, body, to }) => (
  <React.Fragment>
    <h2 className='msg-email'>{email}</h2>
    <p className='msg-body'>{body}</p>
    {to && <Link className='msg-link' to={to}>Ver más</Link>}
  </React.Fragment>
)

CommentCard.defaultProps = {
  email: '',
  body: '',
  to: ''
}

class Msg extends React.Component {
  state = {
    comments: [1,2,3,4,5,6,7,8,9,10],
    fetched: null
  }
  
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(({ data }) => setTimeout(() => this.setState({ comments: data.slice(0, 10), fetched: true }), 500))
  }

  render() {
    const { comments } = this.state
    return (
      <main>
        <h1>Msg.js</h1>
        {comments.map(C => {
          if (typeof C === 'number') {
            return <CommentCard key={C} />
          }

          return (
            <CommentCard
              key={C.id}
              to={`/msg/${C.id}`}
              body={C.body}
              email={C.email}
            />
          )
        })}
      </main>
    )
  }
}

class MyCustomMessage extends React.Component {
  state = {
    comment: {},
    fetched: false
  }

  componentDidMount() {
    const { message } = this.props
    if (typeof parseInt(message) === 'number') {
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
        <Link to='/msg'>Back {`<--`}</Link>
      </main>
    )
  }
}

export default () => (
  <React.Fragment>
    <nav className='msg-navbar'>
      <Link to='/'>
        Inicio
      </Link>
      <Link to='/msg/1'>
        First Comment
      </Link>
    </nav>
    <Router>
      <Msg path='/' />
      <MyCustomMessage path=':message' />
    </Router>
  </React.Fragment>
)
