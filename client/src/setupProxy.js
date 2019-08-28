const proxy = require('http-proxy-middleware')
const {
  BACKEND_PORT=8080
} = process.env


module.exports = function(app) {
  console.log('yo')
  app.use(proxy('/', { target: 'http://localhost:'+BACKEND_PORT+'/' }))
  app.use(proxy('/auth', { target: 'http://localhost:'+BACKEND_PORT+'/' }))
  app.use(proxy('/graphql', { target: 'http://localhost:'+BACKEND_PORT+'/' }))
}
