// This is only used in the client-side
import React from 'react'
import { hydrate } from 'react-dom'
import DinasticoRoutes from './DinasticoRoutes'
import syncChunks from '../.routes/sync-chunks'

const appRoot = document.getElementById('__dinastico__')

hydrate(
  <DinasticoRoutes />,
  appRoot
)
