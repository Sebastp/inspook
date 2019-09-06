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
  searchString: async (_, { phrase='', type = ['readers', 'collections'] }) => {
    phrase = phrase.trim()
    var docsCollections = [],
        docsReaders = []

    if (type.includes('readers')) {
      docsReaders = await Reader.find(
        { displayName: { $regex: phrase , $options : 'i'} },
        {uid: 1, displayName: 1, desc:1, avatar: 1, tag: 1, 'books.bookId': 1}
      ).limit(4).exec()

      docsReaders.map((a)=>{
        a.name = a.displayName
        a.booksCount = a.books.length
        a.cover = a.avatar
        a.color = ''
        a.tags = [a.tag]
        a.type = 'reader'
        return a
      })
    }


    if (type.includes('collections')) {
      docsCollections = await Collection.find({$or:[
        {"title":{$regex:phrase, $options : 'i'}},
        {"desc":{$regex:phrase, $options : 'i'}}
      ]}, {uid: 1, title: 1, desc: 1, color: 1, cover: 1, tags: 1, books: 1})
      .limit(4).exec()

      docsCollections.map((a)=>{
        a.name = a.title
        a.booksCount = a.books.length
        a.type = 'collection'
        return a
      })
    }

    var finalArr = docsReaders.concat(docsCollections)

    var fuse = new Fuse(finalArr, options)

    return fuse.search(phrase)
  }
}

export default {
  Query
}
