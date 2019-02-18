import gql from 'graphql-tag'

export default gql`
  type Query {
    readers: [Reader]
  }


  type Reader {
    id: String!
    displayName: String!
    avatar: String!
    desc: String!
    books: [BookRef]
    official: Boolean
  }

  type BookRef {
    bookId: String
    review: String
  }
`
