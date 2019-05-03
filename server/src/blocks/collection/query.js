import { Collection } from './models'

const Query = {
  collectionByUid: async (_, { uid }) => {
    let resCollection = await Collection.findOne({uid}).exec()
    resCollection.booksCount = resCollection.books.length
    return resCollection
  }
}

export default {
  Query
}
