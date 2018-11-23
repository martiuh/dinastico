// This is only used in the client-side
import React from 'react'
import { hydrate } from 'react-dom'
import DinasticoRoutes from './DinasticoRoutes'

const appRoot = document.getElementById('__estatico')

hydrate(
  <DinasticoRoutes />,
  appRoot
)
