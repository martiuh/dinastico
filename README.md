# **Dinastico** *Hybrid Site Generator*

## Build dynamic, fast and cool `React` based apps


current: pre-alpha

todo: check [TODO.MD](TODO.MD) for the ***Road to Alpha***


## **How does it work?**
Dinastico reads all the `.js` files in the `./src/pages` directory and build a router from them, if you want you can also export a `Router` instance from `@reach/router` and Dinastico will build an `.html` file for each route or file in the `./src/pages` folder.

### Simple Example (shop)

```
// src/pages/index.js
import React from 'react'

export default function Index() {
  return (
    <main>
      <h1>This is a Dinastico.js</h1>
    </main>
  )
}
```
