var axios = require('axios');
var parseString = require('xml2js').parseString;


const grCredentials = {
  key: 'j08HDNkz1Sn0FY86alc1gg',
  secret: 'XFSpYfGMFm9UvxRafHzMDxhnXygXAoCMKEkqbJ5HDro'
};
var noImgUrl = 'https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png'




export async function bookReviews(isbn){
  var url = "https://www.goodreads.com/book/isbn/"+isbn+"?key="+grCredentials.key;
  return new Promise((resolve, reject) => {
    // 'https://cors-anywhere.herokuapp.com/'+url

    axios.get('http://192.168.1.2:8081/'+url).then(res=>{
      parseString(res.data, function (err, result) {
        var res = result.GoodreadsResponse.book[0]
        if (res.image_url[0] == noImgUrl) {
          res.cover = require('../assets/img/noBookCover.jpg')
        }else {
          res.cover = res.image_url[0]
        }

        resolve(res)
      })
    })
  })

}
