import { Reader } from '../models'

const Query = {
  readers: () => {
    return Reader.find().exec()
  },

  getByUid: (_, { uid }) => {
    return Reader.findOne({uid}).exec()
  },

  getRandomReaders: (_, { numToGet }) => {
    return new Promise((resolve, reject) => {
      Reader.findRandom({official:true}, {uid: 1, displayName: 1, avatar: 1, books: 1}, {limit: numToGet}, (err, results) => {
        results.map((a,b) => {
          a.booksCount = a.books.length;
        })
        resolve(results)
      })
    })
  },

  getBookReviewers: (_, { bookid, numToGet }) => {
    return new Promise((resolve, reject) => {
      Reader.findRandom({'books.bookId': bookid, official:true}, {_id: 0, displayName: 1}, {limit: numToGet}, (err, results) => {
        if (results) {
          var names = []
          results.map((a,b) => {
            names.push(a.displayName)
          })
          resolve(names)
        }else {
          resolve(null)
        }
      })
    })
  },


  getChosenReaders: async (_, { uidsArr, getBooksCount = true, howManyBooks = 0 }) => {
    var excFields = {uid: 1, displayName: 1, avatar: 1}
    if (getBooksCount) {
      excFields['books.bookId'] = 1
    }
    let result = await Reader.find({uid: { $in: uidsArr }}, excFields).exec()

    for (var i = 0; i < result.length; i++) {
      if (getBooksCount) {
        result[i].booksCount = result[i].books.length;
        result[i].books = result[i].books.slice(0, howManyBooks)
      }else {
        result[i].booksCount = 0
        result[i].books = []
      }
    }
    return result;
  },


  getBookAsInfo: async (_, { bookid }) => {
    let result = await Reader.find({'books.bookId': bookid}, {displayName: 1, books: 1, _id: 0}).exec(),
        recomms = []
    for (var i = 0; i < result.length; i++) {
      recomms[i] = {}
      recomms[i].name = result[i].displayName;
      var rbooks = result[i].books;

      for (var b = 0; b < rbooks.length; b++) {
        if (rbooks[b].bookId == bookid) {
          recomms[i].review = rbooks[b].review;
          console.log(rbooks[b].review);
          break;
        }
      }
    }

    return {recomms};
  },


  getTopBooks: async (_, { pageSize = 20, page = 1 }) => {

    const docs = await Reader.find({official:true}, {displayName:1, books: 1,  _id: 0}).exec()
      // .skip(((page || 1) - 1) * pageSize)
      // .limit(pageSize)
    var allBooks = []

    await docs.map(a=>{
      a.books.map(c=>{
        var indxOf = allBooks.findIndex(el=>{
          return el.bookId === c.bookId
        })

        if (indxOf==-1) {
          allBooks.push({bookId: c.bookId, reviews: []})
          indxOf = allBooks.length-1
        }
        allBooks[indxOf].reviews.push({name: a.displayName, review: c.review})
      })
    })


    await allBooks.sort((a, b) => b.reviews.length - a.reviews.length)

    return allBooks
  }
}

export default Query
