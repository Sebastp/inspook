const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  console.log('yo')
  app.use(proxy('/', { target: 'http://localhost:8080/ ' }))
  app.use(proxy('/auth', { target: 'http://localhost:8080/ ' }))
  app.use(proxy('/graphql', { target: 'http://localhost:8080/ ' }))
}
