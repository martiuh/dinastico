export default string => `
  <!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>The App</title>
    </head>
    <body>
      <div id="__estatico">
        ${string}
      </div>
      <script defer src='/vendor.js'></script>
      <script defer src='/bundle.js'></script>
    </body>
  </html>
`
