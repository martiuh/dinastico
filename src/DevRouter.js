import React, { memo } from 'react'
import { Link, Router } from '@reach/router'

import syncChunks from '../.routes/sync-chunks'
import fileRouter from '../.routes/file-router'
import buildSyncRouter from './utils/buildSyncRouter'

const FourOFour = () => (
  <div>
    404 Not Found
    <Link to='/'>Go to home</Link>
  </div>
)

// Here I only get where I shall use the path/* pattern
const syncChunksArr = Object.values(syncChunks)
const Chunknames = Object.keys(syncChunks)

function Sandwich() {
  return (
    <main>
      <h1>
        Sandwich.js
      </h1>
    </main>
  )
}

export default function Layout() {
  const DinasticoRouter = () => (
    <Router>
      {syncChunksArr.map((sync, index) => {
        // TODO: Make a Component Base Router
        const Comp = sync.default
        const SyncComp = sync
        let defaultPath = fileRouter[Chunknames[index]]
        defaultPath = defaultPath === 'index/' ? '/' : defaultPath
        let Page = ''
        if (Comp.prototype.render) {
          Page = new Comp() //
          Page = Page.render()
        }
        else {
          Page = Comp()
        }
        if (Page.props.children) {
          // I only need to know if the component children have a path prop
          const newPath = buildSyncRouter(Page.props, defaultPath)
          return <Comp key={newPath || defaultPath} path={newPath || defaultPath} />
        }
        return <SyncComp key={defaultPath} path={defaultPath} />
      })}
      <FourOFour path='*' />
      <Sandwich path='/sandwich' />
    </Router>
  )

  // Without `memo` the reconciliation fails
  const MemoDinastico = memo(DinasticoRouter)

  return (
    <React.Fragment>
      <MemoDinastico />
    </React.Fragment>
  )
}
