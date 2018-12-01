import React from 'react'
import universal from 'react-universal-component'
import { Link, navigate } from '@reach/router'
import { isDev } from '../utils'

const getChunkName = to => {
  let simpleTo = to[0] === '/' && to !== '/' ? to.substr(1) : to
  simpleTo = to === '/' ? to : `${simpleTo}/`
  let chunkName = window.__fullRoutes[simpleTo]
  chunkName = chunkName || window.__fullRoutes[to]
  return chunkName
}

const tryPrefetch = to => {
  if (isDev) {
    return null
  }
  const chunkName = getChunkName(to)
  const importFn = window.__asyncChunks[chunkName]
  return importFn
}

export default function DinasticoLink(props) {
  const { to, onClick, ...rest } = props
  return (
    <Link
      to={to}
      onMouseEnter={event => {
        const importFn = tryPrefetch(to)
        if (importFn) {
          universal(importFn).preload()
        }
      }}
      onClick={event => {
        onClick && onClick(event)
        event.preventDefault()
        const importFn = tryPrefetch(to)
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