// RUN all the React components in the pages folder and build a Router
import fs from 'fs'
import path from 'path'
import kebabCase  from 'lodash/kebabCase'
import slash from 'slash'

import { jsMatch } from './src/utils'
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
let importChunks = ''
let requireChunks = ''
let estaticoRouter = ''
let Compo = ''
fs.readdirSync(pagesPath).forEach(P => {
  if (jsMatch(P)) {
    const chunkName = `site--${kebabCase(`pages/${P}`)}`
    importChunks = `${importChunks}
    "${chunkName}": import("${slash(pagesPath)}/${P}"/* webpackChunkName: "${chunkName}" */),`
    
    requireChunks = `${requireChunks}
    "${chunkName}": require("${slash(pagesPath)}/${P}"),`
  }
})

importChunks = `module.exports = {${importChunks}\n}
`
requireChunks = `module.exports = {${requireChunks}\n}
`
fs.writeFileSync(`${currentDir}/.routes/async-chunks.js`, importChunks)
fs.writeFileSync(`${currentDir}/.routes/sync-chunks.js`, requireChunks)
