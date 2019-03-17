import gql from 'graphql-tag'

export const getBookReviewers = gql`
  query getBookReviewers($bookid: String!, $numToGet: Int!) {
    getBookReviewers(bookid: $bookid, numToGet: $numToGet)
  }
`
