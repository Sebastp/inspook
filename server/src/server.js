import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { createServer } from 'http'

import router from '~/core/router'
import apollo from '~/core/apollo'


const {
  PORT = 8080,
  MONGODB_URL,
  MONGODB_PASSWORD
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
    allowedHeaders: ['Content-Type', 'Authorization'],
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

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
