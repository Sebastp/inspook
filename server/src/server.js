import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { createServer } from 'http'

import router from '~/core/router'
import apollo from '~/core/apollo'

var cors_proxy = require('cors-anywhere');

const {
  PORT = 8080,
  MONGODB_URL
} = process.env

// MONGODB_URL.replace('<PASSWORD>', MONGODB_PASSWORD)
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


// Handle routes
app.use('/', router)


const httpServer = createServer(app)
apollo.installSubscriptionHandlers(httpServer)


cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(8081, '0.0.0.0', function() {
    console.log('Running CORS Anywhere on:' + 8081);
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
