const chalk = require('chalk')
const express = require('express')
const path = require('path')
const compression = require('compression')

const app = express()
const { env } = process
let PORT = env.NODE_ENV === 'production' ? 3002 : 3000
PORT = env.PORT || PORT

app.use(compression())
// app.enable('strict routing')
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/msg/:message', express.static(path.resolve(__dirname, 'public', 'msg', 'message')))

app.use('/movies/:movieId', express.static(path.resolve(__dirname, 'public', 'movies', 'movieId')))

app.listen(PORT, () => console.log(chalk.green(`App listening in localhost: ${PORT}`)))
// Hola
