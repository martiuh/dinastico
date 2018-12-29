import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerLocation, Router } from '@reach/router'
import Helmet from 'react-helmet'

import DefaultHtml from './DefaultHtml'
import template from './template'
import { jsMatch, cssMatch } from '../utils'
import * as syncChunks from '../routes/sync-chunks'
/* eslint-disable import/no-unresolved */
import dinasticoRoutes from '../routes/dinastico-routes.json'
import fullRoutes from '../routes/routes.json'
import stats from '../../public/stats.json'
/* eslint-enable import/no-unresolved */

const dinasticoStats = stats.assetsByChunkName

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

  let js = []
  let css = []
  Object.keys(dinasticoStats).forEach(chunk => {
    let validChunk = null
    chunk.split('~').forEach(c => {
      if (validChunk) {
        return
      }
      validChunk = c === chunkName ? chunk : null
      return null
    })
    if (validChunk) {
      const validChunksArr = dinasticoStats[validChunk]
      const fullChunks = organizeChunks(validChunksArr)
      js = [...js, ...fullChunks.js]
      css = [...css, ...fullChunks.css]
    }
  })
  const addPath = value => `/${value}`
  const bundleChunks = organizeChunks(dinasticoStats.bundle) // webpack bundle
  const bootstrapChunk = organizeChunks(dinasticoStats.bootstrap) // app bootstrap
  let jsArr = [...js, ...bootstrapChunk.js, ...bundleChunks.js]
  jsArr = jsArr.filter(value => !!value)
  jsArr = jsArr.map(addPath)

  let cssArr = [...css, ...bootstrapChunk.js, ...bundleChunks.css]
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
  const helmet = Helmet.renderStatic()
  // return renderToString(<DefaultHtml js={jsArr} css={cssArr} app={appString} {...helmet} />)
  return template(appString, { pages, js: jsArr, css: cssArr, helmet })
}
