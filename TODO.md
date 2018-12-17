## Goals to alpha
- Development features:
  - ~~webpack-dev-middleware instead of webpack-dev-server~~
  - ~~`chokidar` to watch the `pages/ folder` and expect a new `.js` file, when it happens build a new router and reload the `app`~~
  - ~~detects when the any page exports a `Router` instance~~
- ~~Programatically build a **production** Router from the src/pages folder~~
- `dinastico-link` tries to guess if the dynamic url is part of our routing strategy, otherwise just prefetch an `404.html`
- Build a file or folder for each route in our app (for faster first print)
## Dinastico Routing
- .htaccess
  - ~~Make an htaccess file to succesfully route dynamic URL parameters~~
  - Programatically build an htaccess file for our dynamic routes.
- *optional:*
  - php
    - Build an automatic `AltoRouter` with each dynamic url
