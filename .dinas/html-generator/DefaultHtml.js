export default ({ css, js }) => (
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Dinastico * HSG</title>
      <meta generator='generator' content='Dinastico' />
      {csStrings || null}
    </head>
    <div id='__dinastico'>
      {app || null}
    </div>
    {jsString || null}
  </html>
)
//
// export default (string, { Pages, js, css }) => {
//   // The slash is added by estatico-assets-manifest.json
//   const jsString = js.map(J => `<script src="${J}" type="text/javascript" async=""></script>`).join('\n')
//   const cssString = css.map(C => `<link href="${C}" rel="stylesheet" />`)
//
//   return (`<!DOCTYPE html>
//   <html lang="es" dir="ltr">
//     <head>
//       <meta charset="utf-8">
//       <title>Estatico * Simple Router</title>
//       <meta name="generator" content="Dinastico ${dinastico.version}" />
//       ${cssString}
//     </head>
//     <body>
//       <div id="__dinastico">
//         ${string}
//       </div>
//       ${jsString}
//       <script>window.DINASTICO_PAGES=${JSON.stringify(Pages)}</script>
//     </body>
//   </html>
//   `)
// }
