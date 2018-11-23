import * as syncChunks from './.routes/sync-chunks'
import * as fileRouter from './.routes/file-router'

// TODO: Make it asynchronous

const Pages = Object.values(syncChunks)
const PagesNames = Object.keys(syncChunks)
let fullRouter = {}

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

  const routeMaker = (obj, route, paths = {}) => {
    // If the component have props
    /*
      1. If it has props.path then it's a Router object meaning it's the main Route.
      2. If it has props.children then it could have another Router underneath, making the component a 'parent'
    */

    if (obj.children) {
      if (Array.isArray(obj.children)) {
        obj.children.forEach(child => {
          paths = routeMaker(child, route, paths)
        })
      }
      else {
        paths = routeMaker(obj.children, route, paths)
      }
    }

    const buildPath = path => {
      if (path === '/') {
        return null
      }
      paths = {
        ...paths,
        [route]: {
          ...paths[route],
          [path]: true
        }
      }
    }

    if (obj.props) {
      if (Array.isArray(obj.props)) {
        obj.props.forEach(prop => {
          paths = routeMaker(prop, route, paths)
        })
      }
      else if (obj.props.path && !obj.props.children) {
        buildPath(obj.props.path)
      }

      else if (obj.props.path && obj.props.children) {
        paths = {
          ...paths,
          [route]: {
            ...paths[route],
            ...routeMaker(obj.props, obj.props.path, {})
          }
        }
      }
      else {
        paths = routeMaker(obj.props, route, paths)
      }
    }

    return paths
  }

  if (Component.props.children) {
    const componentRoutes = routeMaker(Component, routeName, {})
    if (!componentRoutes[routeName]) {
      fullRouter = Object.assign({}, fullRouter, { [routeName]: true })
    }
    else {
      fullRouter = Object.assign({}, fullRouter, componentRoutes)
    }
  }
})

console.log(JSON.stringify(fullRouter))
