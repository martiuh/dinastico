// This is only used in the client-side
import React from 'react'
import { hydrate } from 'react-dom'
import EstaticoRoutes from './EstaticoRoutes'

const appRoot = document.getElementById('__estatico')

hydrate(
  <EstaticoRoutes />,
  appRoot
)
