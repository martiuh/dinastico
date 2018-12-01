import React from 'react'
import { Link, Router } from '@reach/router'
import axios from 'axios'
import { hydrate } from 'react-dom'
import universal from 'react-universal-component'

import asyncChunks from '../.routes/async-chunks'
import dinasticoRoutes from '../.routes/dinastico-routes.json'
import fullRoutes from '../.routes/routes.json'
import fileRouter from '../.routes/file-router'

import { getPage } from './utils'

let { pathname } = window.location
const dinasticoRoot = document.getElementById('__dinastico')

window.__asyncChunks = asyncChunks
window.__fullRoutes = fullRoutes

pathname = pathname === '/' ? '/index/' : pathname

const pageName = getPage(pathname)
let thePage = asyncChunks[pageName]
let startsWith = null
if (!thePage) {
  [startsWith] = pathname.split('/').filter(item => item !== '')
  startsWith = `${startsWith}/`
  thePage = window.__asyncChunks[getPage(startsWith)]
}

if (thePage && thePage.load) {
  const chunksArr = Object.keys(fileRouter)

  hydrate(
    <Router>
      {chunksArr.map(chunk => {
        let routePath = fileRouter[chunk]
        routePath = routePath === 'index/' ? '/' : routePath
        routePath = dinasticoRoutes[routePath] ? `${routePath}*` : routePath
        const importFunction = asyncChunks[chunk]
        const AsyncRoute = universal(importFunction)
        return <AsyncRoute path={routePath} key={chunk} />
      })}
    </Router>,
    dinasticoRoot
  )
}
