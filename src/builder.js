import React from 'react'
import { renderToString } from 'react-dom/server'
import Loadable from 'react-loadable'
import template from './template'
import Layout from '../src' // This folder
// 1. Get Pages
// 2. Make routes according to filename

export default function(locals) {
  const assets = Object.keys(locals.webpackStats.compilation.assets)
  const staticApp = {}
  const { routes } = locals
  const Pages = Object.keys(routes).map(P => ({
    Page: require(`./pages/${routes[P]}`).default,
    path: P
  }))
  const routeName = routes[locals.path]
  const Compo = require(`./pages/${routeName}`).default
  const App = () => (
    <Layout pages={Pages}>
      <Compo />
    </Layout>
  )

  const appString = renderToString(<App />)
  return template(appString, Pages)
}
