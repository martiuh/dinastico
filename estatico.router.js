// RUN all the React components in the pages folder and build a Router
import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './src/pages/msg'

const currentDir = process.cwd()
const pagesDir = fs.readdirSync(path.join(currentDir, 'src', 'pages'))
fs.writeFile('XXXXXXXXXXXX.files.js', JSON.stringify(pagesDir))
