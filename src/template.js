export default (string, { Pages, js, css }) => {
  // The slash is added by estatico-assets-manifest.json
  const jsString = js.map(J => `<script src="/${J}" type="text/javascript" defer></script>`).join('\n')
  const cssString = css.map(C => `<link href="/${C}" rel="stylesheet" />`).join('\n')

  return(`<!DOCTYPE html>
  <html lang="es" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title>Estatico * Simple Router</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css" rel="stylesheet" />
      ${cssString}
    </head>
    <body>
      <div id="__estatico">
        ${string}
      </div>
      ${jsString}
      <script>window.ESTATICO_PAGES=${JSON.stringify(Pages)}</script>
    </body>
  </html>
  `)
}
