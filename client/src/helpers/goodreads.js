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
    getUrl = LOCAL_SERVER_URL+'/'+url
  }else {
    getUrl = 'http://'+LOCAL_SERVER_IP+':'+ (parseInt(BACKEND_PORT)+1) +'/'+url
  }


  return new Promise((resolve, reject) => {
    axios.get(getUrl).then(res=>{
      parseString(res.data, function (err, result) {
        var res = result.GoodreadsResponse.book[0]

        if (res.image_url[0] === noImgUrl) {
          res.cover = createOpenLibUrl(isbn)

          let image = new Image();
          image.src = res.cover;
          image.onload = () => {
            if (parseFloat(image.height) < 10) {
              res.cover = require('../assets/img/noBookCover.jpg')
            }
            resolve(res)
          }
          image.onerror = () => {
            res.cover = require('../assets/img/noBookCover.jpg')
            resolve(res);
          }
        }else {
          res.cover = res.image_url[0]
          resolve(res)
        }

      })
    })
  })

}
