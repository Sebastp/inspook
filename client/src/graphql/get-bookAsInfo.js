import gql from 'graphql-tag'

export const getBookAsInfo = gql`
  query getBookAsInfo($bookid: String!) {
    getBookAsInfo(bookid: $bookid) {
      recomms{
        review
        name
      }
    }
  }
`
