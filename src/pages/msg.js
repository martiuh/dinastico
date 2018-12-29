import React from 'react'
import { Router } from '@reach/router'
import axios from 'axios'
import Link from 'dinastico-link'

import MyCustomMessage from '../subpages/MyCustomMessage'
import CommentCard from '../components/CommentCard'
import Layout from '../components/Layout'
import '../css/msg.scss'

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
      <main className='msg-box'>
        <h1>Mensajes</h1>
        <Link to='/msg/privacidad'>Ver privacidad</Link>
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
  return (
    <main>
      <h1>Privacidad es importante</h1>
    </main>
  )
}

export default () => (
  <Layout>
    <Router>
      <Msg path='/' />
      <Privacidad path='privacidad' />
      <MyCustomMessage path=':message' />
    </Router>
  </Layout>
)
