## Goals to alpha
- Development features:
  - ~~webpack-dev-middleware instead of webpack-dev-server~~
  - `chokidar` to watch the `pages/ folder` and expect a new `.js` file, when it happens build a new router and reload the `app`
- ~~Programatically build a Router from the src/pages folder~~
- `dinastico-link` tries to guess if the dynamic url is part of our routing strategy, otherwise just prepares an `404.html`
- Build a file system for each dynamic or static route
## Dinastico Routing
- .htaccess
  - Make an htaccess file to succesfully route dynamic URL parameters
- php
  - Buil an automatic `AltoRouter` with each dynamic url
