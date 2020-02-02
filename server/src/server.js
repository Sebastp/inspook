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

var parseString = require('xml2js').parseString;
var redis = require('redis');
var cors_proxy = require('cors-anywhere');


const {
  PORT = 8080,
  CORS_PORT = 8081,
  MONGODB_URL,
  REDISCLOUD_URL
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

const redisClient = redis.createClient(REDISCLOUD_URL, {no_ready_check: true});



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








app.use('/cors', (req, response, next) => {
  let goodreadsUrl = (req.originalUrl).replace("/cors/", ""),
      isbn = goodreadsUrl.substring(
        goodreadsUrl.lastIndexOf("isbn/") + 5,
        goodreadsUrl.lastIndexOf("?key")
      )
      // requestUrl = 'http://cors-anywhere.herokuapp.com/'+goodreadsUrl



  redisClient.get(isbn, function (err, reply) {
    if (err) {
      console.log(err);
    }


    if (reply) {
      console.log('from redis', isbn);
      response.send( JSON.parse(reply) )
    }else {//if not in reddis - download
      get({
        protocol:'http:',
        host: 'localhost',
        port:8081,
        path: '/'+goodreadsUrl,
        method:'GET',
        headers: {
          Origin: 'https://www.inspook.com'
        }
      }, res => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', function(chunk) {
          body += chunk;
        });
        res.on('end', function() {
          parseString(body, function (err, result) {
            if (err) {
              console.log(err);
            }


            //clean up json
            let { asin, book_links, buy_links, country_code, publication_day, edition_information, format, id, is_ebook, small_image_url,
                  kindle_asin, publication_month, publication_year, num_pages, popular_shelves, language_code, text_reviews_count,
                  publisher, ratings_count, reviews_widget, series_works, similar_books, marketplace_id, work,
                ...bookJson } = result.GoodreadsResponse.book[0]


            redisClient.set(isbn, JSON.stringify(bookJson), 'EX', 86400) //save to redis | expire in 24h

            response.send(bookJson)
          })
        });
      }).on('error', function(err) {
        console.log(err);
      })

    }
  });

})



// Handle routes
app.use('/', router)


const httpServer = createServer(app)
apollo.installSubscriptionHandlers(httpServer)


cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(CORS_PORT, '0.0.0.0', function() {
    console.log('Running CORS Anywhere on:' + CORS_PORT );
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})



if (process.env.NODE_ENV === 'production') {
  //keeps heroku alive
  setInterval(function() {
    console.log('re connect heroku');
    get("http://inspook.herokuapp.com");
  }, 300000);
}
