import React from 'react'
import { Router, Link } from '@reach/router'
import axios from 'axios'

import MyCustomMessage from '../component/MyCustomMessage'
import CommentCard from '../component/CommentCard'
import '../css/msg.css'

class Msg extends React.Component {
  state = {
    comments: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    fetched: null
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(({ data }) => (
        setTimeout(() => this.setState({ comments: data.slice(0, 10), fetched: true }), 100)
      ))
  }

  render() {
    const { comments, fetched } = this.state
    return (
      <main>
        <h1>Msg.js</h1>
        {comments.map(C => {
          if (!fetched) {
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

function Privacidad() {
  return <h1>Privacidad es importante</h1>;
}

export default () => (
  <React.Fragment>
    <nav className='msg-navbar'>
      <Link to='/'>
        Inicio
      </Link>
    </nav>
    <Router>
      <Msg path='/' />
      <Privacidad path='privacidad' />
      <MyCustomMessage path=':message' />
    </Router>
  </React.Fragment>
)
