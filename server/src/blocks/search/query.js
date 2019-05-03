import { Collection } from '../collection/models'
import { Reader } from '../reader/models'

const Query = {
  searchString: async (_, { phrase='', type }) => {
    phrase = phrase.trim()

    var docsReaders = await Reader.find(
      { displayName: { $regex: phrase} },
      {uid: 1, displayName: 1, 'books.bookId': 1}
    ).limit(4).exec()

    docsReaders.map((a)=>{
      a.name = a.displayName
      a.booksCount = a.books.length
      a.type = 'reader'
      return a
    })

    var docsCollections = await Collection.find({$or:[
      {"title":{$regex:phrase}},
      {"desc":{$regex:phrase}}
    ]}, {uid: 1, title: 1, desc: 1})
    .limit(4).exec()


    docsCollections.map((a)=>{
      a.name = a.title
      a.type = 'collection'
      return a
    })


    var finalArr = docsReaders.concat(docsCollections)

    return finalArr
  }
}

export default {
  Query
}
