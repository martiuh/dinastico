import React from 'react'
import universal from 'react-universal-component'
import { Link, navigate } from '@reach/router'

export default function DinasticoLink(props) {
  const { to, onClick, ...rest } = props
  return (
    <Link
      to={to}
      onClick={event => {
        onClick && onClick(event)
        event.preventDefault()
        let simpleTo = to[0] === '/' && to !== '/' ? to.substr(1) : to
        simpleTo = to === '/' ? to : `${simpleTo}/`
        let chunkName = window.__fullRoutes[simpleTo]
        chunkName = chunkName || window.__fullRoutes[to]
        const importFn = window.__asyncChunks[chunkName]
        if (importFn) {
          universal(importFn).preload().then(() => navigate(to))
        }
        else {
          navigate(to)
        }
      }}
      {...rest}
    />
  )
}