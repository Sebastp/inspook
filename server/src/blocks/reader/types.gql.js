import gql from 'graphql-tag'

export default gql`
  type Query {
    readers: [Reader]
    getByUid(uid: String!): Reader
    getRandomReaders(numToGet: Int!): [Reader]
    getBookReviewers(bookid: String!, numToGet: Int!): [String]
    getChosenReaders(uidsArr: [String!], getBooksCount: Boolean, howManyBooks: Int): [Reader]
    nrOfShelves(bookid: String!): Int
    getBookReviews(bookid: String!, readerIds: [String]): [BookReview]
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


  type BookRef {
    bookId: String
    review: String
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
