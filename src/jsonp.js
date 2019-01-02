export default (url, callback) => {
  const callbackName = `wikipedia_jsonp_${Math.round(100000 * Math.random())}`
  window[callbackName] = data => {
    delete window[callbackName]
    document.body.removeChild(script)
    callback(null, data)
  }

  const script = document.createElement('script')
  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName
  document.body.appendChild(script)
}
