import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerLocation, Router } from '@reach/router'
import estaticoManifest from '../dist/estatico-assets-manifest.json'

import template from './template'
import EstaticoRoutes from './EstaticoRoutes'
// 1. Get Pages
// 2. Make routes according to filename

export default function(locals) {
  const { routes } = locals
  const routeName = routes[locals.path] // The name of the component
  const pageLocation = estaticoManifest[routeName] // Esto va a pasarse por window. para que lo renderé en el client side
  let jsArr = [
    pageLocation,
    estaticoManifest['vendor.js'],
    estaticoManifest['bundle.js'],
    estaticoManifest['runtime.js'],
  ]

  jsArr = jsArr.filter(value => !!value)

  const js = jsArr.filter(value => value.match(/\.js$/))
  const Pages = Object.keys(routes).map(P => {
    // BUG: Without this require I'm not able to run the builder
    require(`./pages/${routes[P]}`)
    return {
      Page: 'HEHE',
      path: P
    }
  })

  // Instead of sending the page, I'd rather send the location and I avoid all the hassle
  const url = locals.path.slice(0, -1)
  const App = () => (
    <ServerLocation url={url}>
      <EstaticoRoutes />
    </ServerLocation>
  )
  const appString = renderToString(<App />)
  return template(appString, { Pages, js })
}
