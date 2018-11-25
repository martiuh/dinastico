import fs from 'fs'
import path from 'path'

import * as syncChunks from './.routes/sync-chunks'
import * as fileRouter from './.routes/file-router'

// TODO: Make it asynchronous
// Chunkname with path
const Pages = Object.values(syncChunks)
const PagesNames = Object.keys(syncChunks)
let fullRouter = {}
const dinasticoRouter = {}

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
    Component = Component.render()
  }
  else {
    Component = Page()
  }
  if (!Component) {
    return null
  }

  const chunkName = PagesNames[index]
  const routeName = fileRouter[chunkName]

  const routeMaker = (obj, route, routeObj = {}) => {
    // If the component have props
    /*
      1. If it has props.path then it's a Router object meaning it's the main Route.
      2. If it has props.children then it could have another Router underneath, making the component a 'parent'
    */
    if (obj.children) {
      if (Array.isArray(obj.children)) {
        obj.children.forEach(child => {
          routeObj = routeMaker(child, route, routeObj)
        })
      }
      else {
        routeObj = routeMaker(obj.children, route, routeObj)
      }
    }

    const buildPath = path => {
      // TODO: If path starts with slash then we are dealing with an absolute path
      const finalSlash = string => /.*\/$/.test(string)
      const startsWithDots = string => /^:/.test(string)

      const hasDots = startsWithDots(path)
      route = finalSlash(route) ? route : `${route}/`
      path = finalSlash(path) ? path : path.substr(0, path.length)
      path = hasDots ? `${path.substr(1)}` : path
      path = path === '/' ? '' : `${path}/`
      routeObj[`${route}${path}`] = chunkName
      dinasticoRouter[`${route}${path}`] = {
        routeName: `${routeName}*`,
        dynamic: hasDots,
        directory: `${route}${path}`
      }
    }

    if (obj.props) {
      if (Array.isArray(obj.props)) {
        obj.props.forEach(prop => {
          routeObj = routeMaker(prop, route, routeObj)
        })
      }
      else if (obj.props.path && !obj.props.children) {
        buildPath(obj.props.path)
      }

      else if (obj.props.path && obj.props.children) {
        buildPath(obj.props.path)
        routeObj = routeMaker(obj.props, `${route}${obj.props.path}`, routeObj)
      }
      else {
        routeObj = routeMaker(obj.props, route, routeObj)
      }
    }

    return routeObj
  }

  const noIndexRoute = routeName === 'index/' ? '/' : routeName
  if (Component.props.children) {
    const componentRoutes = routeMaker(Component, routeName, {})
    if (!componentRoutes[routeName]) {
      fullRouter = Object.assign({}, fullRouter, { [noIndexRoute]: chunkName })
    }
    else {
      fullRouter = Object.assign({}, fullRouter, componentRoutes)
    }
  }
})

const currentDir = process.cwd()
fs.writeFileSync(path.join(currentDir, '.routes', 'routes.json'), JSON.stringify(fullRouter))
fs.writeFileSync(path.join(currentDir, '.routes', 'dinastico-routes.json'), JSON.stringify(dinasticoRouter))
