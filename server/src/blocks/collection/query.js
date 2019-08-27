import { Collection } from './models'

const Query = {
  collectionByUid: async (_, { uid }) => {
    let resCollection = await Collection.findOne({uid}).exec()
    resCollection.booksCount = resCollection.books.length
    return resCollection
  },

  getRandomCollections: async (_, { numToGet, ignore }) => {
    return new Promise((resolve, reject) => {
      Collection.findRandom({ uid: { "$nin": ignore } }, {uid: 1}, {limit: numToGet}, (err, results) => {
        resolve(results)
      })
    })
  },


  getCollections: async (_, { pageSize = 20, page = 1 }) => {
    var docs = await Collection.find({}, {title:1, desc:1, uid:1, cover: 1, color: 1, tags: 1, 'books': 1, _id: 0})
      .skip(((page || 1) - 1) * pageSize)
      .limit(pageSize)
      .exec()



    docs.map((a)=>{
      a.name = a.title
      a.booksCount = a.books.length
      a.type = 'collection'
      return a
    })

    return docs
  }
}

export default {
  Query
}
