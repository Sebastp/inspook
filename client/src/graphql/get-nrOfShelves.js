import gql from 'graphql-tag'

export const nrOfShelves = gql`
  query nrOfShelves($bookid: String!) {
    nrOfShelves(bookid: $bookid)
  }
`
