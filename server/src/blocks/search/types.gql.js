import gql from 'graphql-tag'

export default gql`
  extend type Query {
    searchString(phrase: String!, type: [String]): [searchResult]
  }


  type searchResult {
    uid: String
    name: String
    desc: String
    cover: String
    booksCount: Int
    type: String
  }
`
