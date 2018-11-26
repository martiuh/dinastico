import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerLocation, Router } from '@reach/router'

import { assetsByChunkName as dinasticoStats } from '../public/stats.json'
import DefaultHtml from './DefaultHtml'
import template from './template'
import { jsMatch, cssMatch } from './utils'
import * as syncChunks from '../.routes/sync-chunks'
import dinasticoRoutes from '../.routes/dinastico-routes.json'
import fullRoutes from '../.routes/routes.json'

// import dinasticoRoutes from './dinasticoRoutes'
// 1. Get Pages
// 2. Make routes according to filename

export default function (locals) {
  const { routes } = locals
  const chunkName = fullRoutes[locals.path] // The name of the component
  const chunkFiles = dinasticoStats[chunkName]

  const organizeChunks = arr => {
    const js = []
    const css = []

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
    }
    else {
      arr.forEach(A => {
        if (jsMatch(A)) {
          js.push(A)
        }
        else if (cssMatch(A)) {
          css.push(A)
        }
      })
    }
    return { js, css }
  }

  const { js, css } = organizeChunks(chunkFiles)
  const addPath = value => `/${value}`
  const bundleChunks = organizeChunks(dinasticoStats.bundle) // webpack bundle
  let jsArr = [...js, ...bundleChunks.js]
  jsArr = jsArr.filter(value => !!value)
  jsArr = jsArr.map(addPath)

  let cssArr = [...css, ...bundleChunks.css]
  cssArr = cssArr.filter(value => !!value)
  cssArr = cssArr.map(addPath)

  let pages = {}
  Object.keys(routes).forEach(P => {
    pages = {
      ...pages,
      [P]: jsArr[0]
    }
    return null
  })

  const url = locals.path
  const Component = syncChunks[chunkName].default
  let Url = url === '/index' ? '/' : url
  Url = dinasticoRoutes[url] ? dinasticoRoutes[url].routeName : Url
  const App = () => (
    <ServerLocation url={url}>
      <Router baseuri='/'>
        <Component path={Url} />
      </Router>
    </ServerLocation>
  )

  const appString = renderToString(<App />)
  return template(appString, { pages, js: jsArr, css: cssArr })
}
