const proxy = require('http-proxy-middleware')
const {
  PORT = 8080
} = process.env


module.exports = function(app) {
  console.log('yo')
  app.use(proxy('/', { target: 'http://localhost:'+PORT+'/' }))
  app.use(proxy('/auth', { target: 'http://localhost:'+PORT+'/' }))
  app.use(proxy('/graphql', { target: 'http://localhost:'+PORT+'/' }))
}
