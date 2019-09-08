import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { createServer, get } from 'http'
import basicAuth from 'express-basic-auth'

import router from '~/core/router'
import apollo from '~/core/apollo'

var cors_proxy = require('cors-anywhere');

const {
  PORT = 8080,
  MONGODB_URL
} = process.env


mongoose
  .connect(
    MONGODB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.error(err)
  })


// Create express app
const app = express()




// Parse cookies
app.use(cookieParser())

// Enable cors
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization', "Access-Control-Allow-Origin"],
    credentials: true,
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false
  })
)




// Enable GZIP compression
app.use(compression())



apollo.applyMiddleware({ app })

/*
//add auth
const siteLock = basicAuth({
  challenge: true,
  users: { dev: 'SITELOCK_PASSWORD' }
})
app.use(siteLock)
*/

// Handle routes
app.use('/', router)



const httpServer = createServer(app)
apollo.installSubscriptionHandlers(httpServer)


cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen((parseInt(PORT)+1), '0.0.0.0', function() {
    console.log('Running CORS Anywhere on:' + (parseInt(PORT)+1) );
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})



if (process.env.NODE_ENV === 'production') {
  //keeps heroku alive
  setInterval(function() {
    get("http://inspook.herokuapp.com");
  }, 300000);
}
