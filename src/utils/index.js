export { default as getPage } from './getPage'
export { default as buildSyncRouter } from './buildSyncRouter'

export const isDev = process.env.NODE_ENV === 'development'
export const isServer = typeof window === 'undefined'
export const jsMatch = string => string.match(/\.js$/)
export const cssMatch = string => string.match(/\.css$/)
