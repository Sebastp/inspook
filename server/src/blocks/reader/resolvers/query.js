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



  getBookReviews: async (_, { bookid, readerIds }) => {
    const filterObj = {'books.bookId': bookid}

    if (readerIds) {
      filterObj['uid'] = {$in: readerIds}
    }
// {$elemMatch : {'bookId': bookid}}
    let result = await Reader.find(filterObj, {displayName: 1, avatar: 1, uid: 1, books: 1, _id: 0}).exec()

    result.map((a)=>{
      a.booksCount = a.books.length
      const searchedBookObj = a.books.filter(book => book.bookId == bookid)[0]
      a.review = searchedBookObj.review
      return a
    })


    return result;
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
    var excFields = {uid: 1, displayName: 1, desc: 1, avatar: 1}
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


  nrOfShelves: async (_, { bookid }) => {
    let result = await Reader.countDocuments({'books.bookId': bookid})
    return result
  },


  getTopBooks: async (_, { pageSize = 20, page = 1 }) => {
    const docs = await Reader.find({official:true}, {displayName:1, 'books.bookId': 1, _id: 0})
      // .skip(((page || 1) - 1) * pageSize)
      // .limit(pageSize)
      .exec()
    var allBooks = []

    await docs.map(a=>{
      a.books.map(c=>{
        var indxOf = allBooks.findIndex(el=>{
          return el.bookId == c.bookId
        })

        if (indxOf==-1) {
          allBooks.push({bookId: c.bookId, onShelves: 0})
          indxOf = allBooks.length-1
        }

        allBooks[indxOf].onShelves += 1
      })
    })


    await allBooks.sort((a, b) => b.onShelves - a.onShelves)

    const pageStart = ((page || 1) - 1) * pageSize
    allBooks = allBooks.slice(pageStart, pageStart+pageSize)
    console.log(allBooks);
    return allBooks
  }
}

export default Query
