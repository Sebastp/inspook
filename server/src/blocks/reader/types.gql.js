import gql from 'graphql-tag'

export default gql`
  type Query {
    readers: [Reader]
    getByUid(uid: String!): Reader
    getRandomReaders(numToGet: Int!): [Reader]
    getBookReviewers(bookid: String!, numToGet: Int!): [String]
    getChosenReaders(uidsArr: [String!], bookId: String, getBooksCount: Boolean, howManyBooks: Int): [Reader]
    nrOfShelves(bookid: String!): Int
    getBookReviews(bookid: String!, readerIds: [String]): [BookReview]
    getTopBooks(pageSize: Int, page: Int): [topBook]
    getPeople(pageSize: Int, page: Int): [Reader]
  }


  type Reader {
    uid: String
    displayName: String
    avatar: String
    desc: String
    tag: String
    books: [BookRef]
    booksCount: Int
    official: Boolean
  }


  type BookRef {
    bookId: String
    review: String
    source: BookSource
  }

  type BookSource {
    name: String
    url: String
  }


  type BookReview {
    uid: String
    displayName: String
    avatar: String
    booksCount: Int
    review: String
  }

  type topBook {
    bookId: String
    onShelves: Int
  }
`
