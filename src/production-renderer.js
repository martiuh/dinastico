import React from 'react'
import { Link, Router } from '@reach/router'
import axios from 'axios'
import { hydrate } from 'react-dom'

import asyncPages from '../.routes/async-chunks'
import { getPage } from './utils'

window.asyncPages = asyncPages

let { pathname } = window.location
const estaticoRoot = document.getElementById('__estatico')

pathname = pathname === '/' ? 'index' : pathname

const pageName = getPage(pathname)
const thePage = asyncPages[pageName]
if (thePage && thePage.load) {
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
