import { kebabCase } from 'lodash'

export const isServer = typeof window === 'undefined'
export const jsMatch = string => string.match(/\.js$/)
export const cssMatch = string => string.match(/\.css$/)
export const getPage = string => {
  const { pathname } = window.location
  let pageName = `${pathname}js`
  pageName = kebabCase(pageName)
  pageName = `site--pages-${pageName}`
  return pageName
}
