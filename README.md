# **Dinastico** *Hybrid Site Generator*

## Build dynamic, fast and cool `React` based apps


current: pre-alpha

todo: check [TODO.MD](TODO.MD) for the ***Road to Alpha***


## **How does it work?**
Dinastico reads all the `.js` files in the `./src/pages` directory and builds an static site from them, if you want you can also export a `Router` component from `@reach/router` and Dinastico will build an `.html` file for each `Router` or `React` component and since it supports code-splitting for `.js` and `.css` (incluidng `.sass` and `.scss`) the first print is really fast.

## **How will my app look like?**

```jsx
// .src/pages/movies.js
import React from 'react'
import { Router } from '@reach/router'

import MovieIndex from '../components/MovieIndex'
import MovieCard from '../components/MovieCard'

export default function MoviesRouter() {
  return (
    <Router>
      <MovieIndex path='/' />
      <MovieCard path=':movieId' />
    </Router>
  )
}
```
file in ./src/pages | outputs in ./public
-----|------
`index.js` | `index.html`
`movies.js` // MovieIndex | `movies/index.html` // It's static
`movies.js` // MovieCard | `movies/movieId/index.html` // It's dynamic



## How does it manage a static site with `dynamic` routes.
To make sure this works, you need to have a routing strategy, but not be afraid, I've done succesful tests with .htaccess, the way `dinastico` deals with dynamic url is like this.

## How will dinastico handle this specific component?
  1. **Build a file router** The first step of dinastico is build a simple router called `file-router`, it contains all the files inside `pages` directory and it handles each file as a route (including `index.js`). In the example above it considers `/movies` as the path. Also during this step, dinastico makes the custom `chunkName` for each component.
  2. **Make dynamic router**, after we have all the files, then dinastico runs each exported Component from `pages` directory  

The first thing it'll do is run the component during build time, yes!, since every React Component is either a function (like in this case) or a function I can call it without mounting it in the `DOM` and reads its insides, and since any `Router` children have a `path` prop, then it's pretty damn easy to get an idea how the app is structured.


# **Features**
- Code spliting (also for `.css`)
- `@reach/router`
- Export a Router Component rather than a Component an dinastico will make all the respective files.

- ### **Development**
  - Really fast HMR thanks to the new `react-hot-loader 4.6.1` and `@hot-loader/react-dom`

