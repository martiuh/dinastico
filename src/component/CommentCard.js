import React from 'react'
import { Link } from '@reach/router'

export default function CommentCard({ email, body, to }) {
  return (
    <React.Fragment>
      <h2 className='msg-email'>{email}</h2>
      <p className='msg-body'>{body}</p>
      {to && <Link className='msg-link' to={to}>Ver más</Link>}
    </React.Fragment>
  )
}

CommentCard.defaultProps = {
  email: '',
  body: '',
  to: ''
}