// RUN all the React components in the pages folder and build a Router
import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import kebabHash from 'kebab-hash'
import slash from 'slash'

import { jsMatch } from './src/utils'
import App from './src/pages/msg'

/*
  {
    '/': {
      fileName: 'estatico--pages-index--js-168.js',
      path: '/'
    },
    '/msg': {
      fileName: 'estatico--pages-msg--js-168.js',
      path: '/msg'
    }
  }
*/
const currentDir = process.cwd()
const pagesPath = path.join(currentDir, 'src', 'pages')
let pagesDir = ''
let estaticoRouter = ''
let Compo = ''
fs.readdirSync(pagesPath).forEach(P => {
  if (jsMatch(P)) {
    const chunkName = `site--${kebabHash(`pages/${P}`)}`
    pagesDir = `${pagesDir}
    "${chunkName}.js": import("${slash(pagesPath)}/${P}"/* webpackChunkName: "${chunkName}" */),`
  }
})

// let routes = {}
// const paths = pages.map(P => {
//   const routeName = `/${P.split('.js')[0]}`
//   const indexName = P !== 'index.js' ? routeName : '/'
//   routes[indexName] = P
//   return indexName
// })
//
// routes = {
//   ...routes,
//   '/msg/message': 'msg.js'
// }
//
// paths.push('/msg/message')

// Since it has already \n
pagesDir = `module.exports = {${pagesDir}\n}
`
fs.writeFileSync(`${currentDir}/.routes/async-pages.js`, pagesDir)
