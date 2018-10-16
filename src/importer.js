module.exports = modulePath => new Promise((res, reject) => {
  import(
    /* webpackChunkName: "[request]-chunk" */ `${modulePath}`
  )
    .then((mod) => {
      if (mod.default) {
        return res(mod.default)
      }
      return res(mod)
    })
    .catch(err => reject(new Error('importer error', err)))
})
