import gql from 'graphql-tag'

export const getRandomReaders = gql`
  query getRandomReaders($numToGet: Int!) {
    getRandomReaders(numToGet: $numToGet) {
      uid
      displayName
      avatar
      booksCount
    }
  }
`
