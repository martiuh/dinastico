// This is only used in the client-side
import React from 'react'
import { AppContainer } from 'react-hot-loader'

import { render } from 'react-dom'
import DevRouter from './DevRouter'

const appRoot = document.getElementById('__dinastico')

const renderApp = App => render(
  <AppContainer>
    <App />
  </AppContainer>,
  appRoot
)

renderApp(DevRouter)

if (module.hot) {
  module.hot.accept('./DevRouter', () => {
    // eslint-disable-next-line global-require
    const NewDevRouter = require('./DevRouter').default
    renderApp(NewDevRouter)
  })
}
