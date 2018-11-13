import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerLocation, Router } from '@reach/router'

import { assetsByChunkName as estaticoStats} from '../public/stats.json'
import manifest from '../public/estatico-assets-manifest.json'
import DefaultHtml from './DefaultHtml'
import template from './template'
// import EstaticoRoutes from './EstaticoRoutes'
// 1. Get Pages
// 2. Make routes according to filename

export default function(locals) {
  const { routes } = locals
  const fileName = routes[locals.path] // The name of the component
  const chunkName = fileName.split('.js')[0]
  const pageLocation = manifest[fileName] // Esto va a pasarse por window. para que lo renderé en el client side
  let chunkFiles = []
  Object.keys(estaticoStats).map(chunk => {
    const chunks = chunk.split('-')
    const fileIndex = chunks.indexOf(chunkName)
    if (fileIndex >= 0) {
      const files = estaticoStats[chunk]
      if (Array.isArray(files)) {
        return files.forEach(F => chunkFiles.push(F))
      }
      return chunkFiles.push(files)
    }

    return false
  })

  const organizeChunks = arr => {
    const js = []
    const css = []

    const jsMatch = string => string.match(/\.js$/)
    const cssMatch = string => string.match(/\.css$/)

    if (!Array.isArray(arr)) {
      // Find out what file type is
      if (typeof arr === 'string') {
        if (jsMatch(arr)) {
          js.push(arr)
        }
        else if (cssMatch(arr)) {
          css.push(arr)
        }
      }
      return { js, css }
    }

    arr.forEach(A => {
      if (jsMatch(A)) {
        js.push(A)
      }
      else if(cssMatch(A)) {
        css.push(A)
      }
    })
    return { js, css }
  }

  chunkFiles = chunkFiles.filter(files => !!files)
  const { js, css } = organizeChunks(chunkFiles)
  const addPath = value => `/${value}`
  const bundleChunks = organizeChunks(estaticoStats['bundle'])
  let jsArr = [...js, ...bundleChunks.js]
  jsArr = jsArr.filter(value => !!value)
  jsArr = jsArr.map(addPath)

  let cssArr = [...css, ...bundleChunks.css]
  cssArr = cssArr.filter(value => !!value)
  cssArr = cssArr.map(addPath)

  let pages = {}
  Object.keys(routes).map(P => {
    pages = {
      ...pages,
      [P]: manifest[routes[P]]
    }
  })

  // Instead of sending the page, I'd rather send the location and I avoid all the hassle
  const url = locals.path
  const Component = require(`./pages/${fileName}`).default
  const App = () => (
    <ServerLocation url={url}>
      <Router>
        <Component path='/*' />
      </Router>
    </ServerLocation>
  )
  const appString = renderToString(<App />)
  return template(appString, { pages, js: jsArr, css: cssArr })
}
