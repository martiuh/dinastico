// RUN all the React components in the pages folder and build a Router
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './src/pages/msg'

fs.writeFile('XXXXXXXXXXXX.files.js', JSON.stringify(App()))
