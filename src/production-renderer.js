import React from 'react'
import { Link, Router } from '@reach/router'
import axios from 'axios'
import { hydrate } from 'react-dom'

import asyncPages from '../.routes/async-chunks'
import { getPage } from './utils'

window.asyncPages = asyncPages

let { pathname } = window.location
const dinasticoRoot = document.getElementById('__dinastico__')

pathname = pathname === '/' ? '/index/' : pathname

const pageName = getPage(pathname)
let thePage = asyncPages[pageName]
let startsWith = null
if (!thePage) {
  [startsWith] = pathname.split('/').filter(item => item !== '')
  startsWith = `${startsWith}/`
  thePage = window.asyncPages[getPage(startsWith)]
}

if (thePage && thePage.load) {
  const compos = Object.values(asyncPages)

  thePage.load()
    .then(PreComponent => {
      const Compo = PreComponent.default
      let renderPathName = startsWith ? `${startsWith}*` : `${pathname}*`
      renderPathName = renderPathName === '/index/*' ? '/' : renderPathName
      return hydrate(
        <Router>
          <Compo path={renderPathName} />
        </Router>,
        dinasticoRoot
      )
    })
}
