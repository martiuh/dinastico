import React from 'react'
import { hydrate } from 'react-dom'
import Layout from './Layout'

const estaticoRoot = document.getElementById('__estatico')
hydrate(
  <Layout />,
  estaticoRoot
)
