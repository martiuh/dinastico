import * as syncChunks from './.routes/sync-chunks'
import React from 'react'
import { Object } from 'core-js';

const Pages = Object.values(syncChunks)
const PagesNames = Object.keys(syncChunks)

Pages.forEach((P, index) => {
  if (!P.default) {
    return null
  }
  let Page = P.default
  let Component = null
  if (!Page.prototype) {
    return null
  }
  if (Page.prototype.render) {
    Component = new Page()
  }
  else {
    Component = Page()
  }
  if (!Component || !Component.props) {
    return null
  }
  console.log({ hasProps: PagesNames[index] })
})