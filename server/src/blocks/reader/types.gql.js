import gql from 'graphql-tag'

export default gql`
  type Query {
    readers: [Reader]
    getByUid(uid: String!): Reader
    getRandomReaders(numToGet: Int!): [Reader]
    getBookReviewers(bookid: String!, numToGet: Int!): [String]
    getChosenReaders(uidsArr: [String!], getBooksCount: Boolean, howManyBooks: Int): [Reader]
    shelvesOfBookNr(bookid: String!): Int
    getBookAsInfo(bookid: String!): BookAsInfo
    getTopBooks(pageSize: Int, page: Int): [topBook]
  }


  type Reader {
    uid: String!
    displayName: String!
    avatar: String!
    desc: String!
    books: [BookRef]
    booksCount: Int
    official: Boolean
  }

  type BookAsInfo {
    recomms: [BookReview]
  }

  type BookRef {
    bookId: String
    review: String
  }

  type BookReview {
    name: String
    review: String
  }

  type topBook {
    bookId: String
    reviews: [BookReview]
  }
`
