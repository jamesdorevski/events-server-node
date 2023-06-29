const koaJwt = require('koa-jwt')

module.exports = koaJwt({
  secret: 'secret' // TODO: Read this in from a environment variable
})
