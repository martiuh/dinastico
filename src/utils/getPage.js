import kebabCase from 'lodash/kebabCase'

export default string => {
  let pageName = `${string}js`
  pageName = kebabCase(pageName)
  pageName = `site--pages-${pageName}`
  return pageName
}
