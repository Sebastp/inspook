import gql from 'graphql-tag'

export default gql`
  extend type Query {
    collectionByUid(uid: String!): Collection
    getRandomCollections(numToGet: Int!, ignore: [String]): [randCollections]
    getCollections(pageSize: Int, page: Int): [Collection]
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

  type randCollections {
    uid: String!
    title: String
  }
`
