import gql from 'graphql-tag'

export default gql`
  extend type Query {
    collectionByUid(uid: String!): Collection
  }


  type Collection {
    uid: String!
    title: String!
    desc: String!
    cover: String!
    color: String!
    tags: [String]
    books: [String]
    booksCount: Int
  }
`
