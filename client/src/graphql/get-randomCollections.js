import gql from 'graphql-tag'

export const getRandomCollections = gql`
  query getRandomCollections($numToGet: Int!, $ignore: [String]) {
    getRandomCollections(numToGet: $numToGet, ignore: $ignore) {
      uid
    }
  }
`
