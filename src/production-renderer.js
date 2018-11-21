import React from 'react'
import { Link, Router } from '@reach/router'
import axios from 'axios'
import { hydrate } from 'react-dom'

import asyncPages from '../.routes/async-chunks'
import { getPage } from './utils'

window.asyncPages = asyncPages

let { pathname } = window.location
const estaticoRoot = document.getElementById('__estatico')

pathname = pathname === '/' ? '/index/' : pathname

const pageName = getPage(pathname)
let thePage = asyncPages[pageName]
if (!thePage) {
  const startsWith = pathname.split('/').filter(item => item !== '')[0]
  thePage = asyncPages[getPage(`${startsWith}/`)]
}

if (thePage && thePage.load) {
  const compos = Object.values(asyncPages)
  console.log(compos)
  thePage.load()
    .then(PreComponent => {
      const Compo = PreComponent.default
      return hydrate(
        <Router>
          <Compo path='/*' />
        </Router>,
        estaticoRoot
      )
    })
}
