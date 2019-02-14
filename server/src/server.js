import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import router from '~/core/router'


const {
  PORT = 8080,
  MONGODB_URL,
  MONGODB_PASSWORD
} = process.env


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


// Handle routes
app.use('/', router)
