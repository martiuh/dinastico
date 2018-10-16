const express = require('express')
const path = require('path')
const app = express()
const { env } = process;
let PORT = env.NODE_ENV === 'production' ? 3002 : 3000
PORT = env.PORT || PORT

app.use(express.static(path.resolve(__dirname, 'dist')))

app.listen(PORT, () => console.log('App listening in localhost:' + PORT))
