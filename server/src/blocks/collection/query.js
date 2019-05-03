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
  }
}

export default {
  Query
}
