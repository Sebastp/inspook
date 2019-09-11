import {grCredentials, LOCAL_SERVER_URL} from '../env'
import {createOpenLibUrl} from './openlibrary'

var axios = require('axios');
var parseString = require('xml2js').parseString;


var noImgUrl = 's.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'

const {
  BACKEND_PORT=8080,
  LOCAL_SERVER_IP='localhost'
} = process.env


export async function bookReviews(isbn){
  var url = "https://www.goodreads.com/book/isbn/"+isbn+"?key="+grCredentials.key,
      getUrl;


  if (process.env.NODE_ENV === 'production') {
    getUrl = LOCAL_SERVER_URL+'/cors/'+url
  }else {
    // getUrl = 'http://'+LOCAL_SERVER_IP+':'+ (parseInt(BACKEND_PORT) +1) +'/'+url
    // getUrl = 'http://'+LOCAL_SERVER_IP+':'+ (BACKEND_PORT) +'/'+url
    // getUrl = 'https://cors-anywhere.herokuapp.com/'+url
    getUrl = 'http://'+LOCAL_SERVER_IP+':8080/cors/'+url
  }



  return new Promise((resolve, reject) => {
    axios.get(getUrl).then(res=>{
      let bookJson = res.data
      

      if (bookJson.image_url[0] === noImgUrl) {
        bookJson.cover = createOpenLibUrl(isbn)

        let image = new Image();
        image.src = bookJson.cover;
        image.onload = () => {
          if (parseFloat(image.height) < 10) {
            bookJson.cover = require('../assets/img/noBookCover.jpg')
          }
          resolve(bookJson)
        }
        image.onerror = () => {
          bookJson.cover = require('../assets/img/noBookCover.jpg')
          resolve(bookJson);
        }
      }else {
        bookJson.cover = bookJson.image_url[0]
        resolve(bookJson)
      }

    })
  })

}
