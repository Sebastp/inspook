import gql from 'graphql-tag'

export const searchString = gql`
  query searchString($phrase: String!, $type: String) {
    searchString(phrase: $phrase, type: $type) {
      uid
      name
      desc
      booksCount
      type
    }
  }
`
