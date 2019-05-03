import { Collection } from '../collection/models'
import { Reader } from '../reader/models'
import Fuse from 'fuse.js'



var options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name"
  ]
};



const Query = {
  searchString: async (_, { phrase='', type }) => {
    phrase = phrase.trim()

    var docsReaders = await Reader.find(
      { displayName: { $regex: phrase , $options : 'i'} },
      {uid: 1, displayName: 1, 'books.bookId': 1}
    ).limit(4).exec()

    docsReaders.map((a)=>{
      a.name = a.displayName
      a.booksCount = a.books.length
      a.type = 'reader'
      return a
    })

    var docsCollections = await Collection.find({$or:[
      {"title":{$regex:phrase, $options : 'i'}},
      {"desc":{$regex:phrase, $options : 'i'}}
    ]}, {uid: 1, title: 1, 'books': 1})
    .limit(4).exec()


    docsCollections.map((a)=>{
      a.name = a.title
      a.booksCount = a.books.length
      a.type = 'collection'
      return a
    })
    
    var finalArr = docsReaders.concat(docsCollections)

    var fuse = new Fuse(finalArr, options)

    return fuse.search(phrase)
  }
}

export default {
  Query
}
