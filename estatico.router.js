import * as syncChunks from './.routes/sync-chunks'

import * as fileRouter from './.routes/file-router'

const Pages = Object.values(syncChunks)
const PagesNames = Object.keys(syncChunks)

Pages.forEach((P, index) => {
  if (!P.default) {
    return null
  }
  const Page = P.default
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

  const chunkName = PagesNames[index]
  const routeName = fileRouter[chunkName]

  console.log(`\n${routeName}\n`)

  const childrenLogger = arr => {
    if (typeof arr === 'string') {
      return
    }
    if (!Array.isArray(arr)) {
      return console.log({ hasPath: arr.props.path })
    }
    arr.forEach(A => {
      console.log({ hasPath: A.props.path })
      if (Array.isArray(A.props.children)) {
        console.log({ hasChildren: true })
        childrenLogger(A.props.children)
      }
    })
  }

  if (Component.props.children) {
    if (Array.isArray(Component.props.children)) {
      Component.props.children.forEach(C => {
        console.log({
          childrenProps: C.props
        })
      })
    }
    else {
      // console.log(JSON.stringify(Component.props))
      // console.log({ hasPath: Component.props.children.path})
      childrenLogger(Component.props.children.props.children)
    }
  }
})
