const fs = require('fs')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const resolve = file => path.resolve(__dirname, file)

const isProd = process.env.NODE_ENV === 'production'
const routes = require('./router.config')

const viewMiddleware = require('./middlewares/view')
const app = express();

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.use(logger('dev'));
app.use(express.json());
app.use('/dist', serve('./dist', true))
app.use('/public', serve('./public', true))

app.use('/api', routes)

app.use(viewMiddleware(app))

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

module.exports = app