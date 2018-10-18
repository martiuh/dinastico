export default (string, { routes, js}) => {
  // The slash is added by estatico-assets-manifest.json
  const jsString = js.map(J => `<script src="${J}" type="text/javascript" async></script>`).join('')
  return(`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>The App</title>
    </head>
    <body>
      <div id="__estatico">
        ${string}
      </div>
      ${jsString}
      <script>window.ESTATICO_PAGES=${JSON.stringify(routes)}</script>
    </body>
  </html>
  `)
}
