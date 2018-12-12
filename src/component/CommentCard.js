import React from 'react'
import { Link } from '@reach/router'

import './CommentCard.scss'

export default function CommentCard({ email, body, to }) {
  return (
    <main className='msg-card'>
      <h2 className='msg-email'>{email}</h2>
      <p className='msg-body'>{body}</p>
      {to && <Link className='msg-link' to={to}>Ver más</Link>}
    </main>
  )
}

CommentCard.defaultProps = {
  email: '',
  body: '',
  to: ''
}
