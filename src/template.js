export default (string, { pages, js, css }) => {
  // The slash is added by estatico-assets-manifest.json
  const jsString = js.map(J => `<script src="${J}" type="text/javascript" async></script>`).join('\n')
  const cssString = css.map(C => `<link href="${C}" rel="stylesheet" />`).join('\n')

  return(`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Estatico * Simple Router</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${cssString}
    </head>
    <body>
      <div id="__estatico">
        ${string}
      </div>
      ${jsString}
      <script>window.pages=${JSON.stringify(pages)}</script>
    </body>
  </html>
  `)
}
