// RUN all the React components in the pages folder and build a Router
import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import kebabHash from 'kebab-hash'

import { jsMatch } from './src/utils'
import App from './src/pages/msg'
/*

        d88888b .d8888. d888888b  .d8b.  d888888b d888888b  .o88b.  .d88b.
        88'     88'  YP `~~88~~' d8' `8b `~~88~~'   `88'   d8P  Y8 .8P  Y8.
        88ooooo `8bo.      88    88ooo88    88       88    8P      88    88
        88~~~~~   `Y8b.    88    88~~~88    88       88    8b      88    88
        88.     db   8D    88    88   88    88      .88.   Y8b  d8 `8b  d8'
        Y88888P `8888Y'    YP    YP   YP    YP    Y888888P  `Y88P'  `Y88P'

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
fs.readdirSync(pagesPath).forEach(P =>
  if (jsMatch(P)) {
    const chunkName = `site--${kebabHash(`pages/${P}`)}`
    pagesDir = `${pagesDir}
    "${chunkName}.js": import("${pagesPath}/${P}"/* webpackChunkName: "${chunkName}" */),`
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
fs.writeFile(`${currentDir}/.routes/async-pages.js`, pagesDir)
