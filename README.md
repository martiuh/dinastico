# Dinastico Hybrid Site Generator

current: pre-alpha

todo: check TODO.md for the ***Road to Alpha***


## Motivation

Although there are powerful `React` based static site generators, I see most of them have a problem, they don't support dynamic urls, so I had an idea, what if I make multiple apps instead of only one app and then in build time I stich them all together using `@reach/router`'s ability to extend the main Router exporting other Routers instance