import {grCredentials} from '../env'
import {createOpenLibUrl} from './openlibrary'

var axios = require('axios');
var parseString = require('xml2js').parseString;


var noImgUrl = 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'




export async function bookReviews(isbn){
  var url = "https://www.goodreads.com/book/isbn/"+isbn+"?key="+grCredentials.key;
  return new Promise((resolve, reject) => {

    axios.get('http://192.168.1.2:8081/'+url).then(res=>{
      parseString(res.data, function (err, result) {
        var res = result.GoodreadsResponse.book[0]

        if (res.image_url[0] == noImgUrl) {
          res.cover = createOpenLibUrl(isbn)
          // res.cover = require('../assets/img/noBookCover.jpg')
        }else {
          res.cover = res.image_url[0]
        }

        resolve(res)
      })
    })
  })

}
