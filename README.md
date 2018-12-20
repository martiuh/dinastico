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
      <MovieCard path=':movieName' />
    </Router>
  )
}
```
file in ./src/pages | outputs in ./public
-----|------
`index.js` | `index.html`
`movies.js` // MovieIndex | `movies/index.html` // It's static
`movies.js` // MovieCard | `movies/movieName/index.html` // It's dynamic


## How does it manage a static site with `dynamic` routes.
To make sure this works, you need to setup a router in your server, but not be afraid, I've done succesful tests with `.htaccess` ~~(and dinastico comes with an automatic .htaccess router builder)~~ in shared hosting and it's really fast (as you'd expect). The trick is in redirecting all the dynamic looking requests to the static server location:

  **Examples**
  
  ```
   /movies/episode-iv/ reads from /movies/movieName/index.html
   /movies/the-ring/ reads from /movies/movieName/index.html
   /movies/pulp-fiction/ reads from /movies/movieName/index.html
   ... and you get the idea, right?
  ```


# **Features**
- Code spliting (also for `.css`)
- fast `HMR` with newest `react-hot-loader` (getting ready for hooks!!!)
- With all the power from:
  - webpack 4
  - babel 7
  - react 16.6
  - react-universal-component
  - extract-css-chunks

